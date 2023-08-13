import React, {FC, useEffect, useMemo, useState} from "react";
import {TodoItem, TodoList, UpdateList} from "../../lib/todo";
import {getEncryptedListData} from "../../lib/cryption";
import {TodoForm} from "../../components/TodoForm";
import {useStorePersist} from "../../lib/storage";
import {useNavigate} from "react-router-dom";
import {HandleComplete} from "../../lib/ActionHandlers";
import {useAuth} from "react-oidc-context";

export const TaskPage: FC = () => {
  const [tasks, setTasks] = useState<TodoList>({items: []});
  const {UserSubject, Salt, setSalt} = useStorePersist();
  const navigate = useNavigate();

  const auth = useAuth();
  const accessToken = auth.user?.access_token || "";

  // are we in open mode?
  let url = new URL(window.location.href);
  let completeMode = url.searchParams.get("complete") === "true";
  const taskId = url.searchParams.get("task") || "";
  const [passwordAttempted, setPasswordAttempted] = useState<boolean>(false);

  useEffect(() => {
    getEncryptedListData(accessToken, UserSubject, Salt, setTasks, setSalt, setPasswordAttempted);
  }, [accessToken, UserSubject, Salt, setSalt]);
  const filteredTask = useMemo(() => {
    for (let i = 0; i < tasks.items.length; i++) {
      if (tasks.items[i].id === taskId) {
        return tasks.items[i];
      }
    }
  }, [taskId, tasks.items])

  function handleComplete(todoItem: TodoItem) {
    HandleComplete(todoItem, tasks, accessToken, UserSubject, Salt);
    navigate("/");
  }

  const handleCallback = () => {
    navigate("/");
  }

  useEffect(() => {
    if (completeMode && filteredTask && taskId !== "") {
      filteredTask.completed = true;
      setTasks({...tasks, items: tasks.items.map(i => i.id === filteredTask.id ? filteredTask : i)})
      UpdateList(accessToken, UserSubject, Salt, tasks)
      navigate("/");
    }
  }, [completeMode, filteredTask, taskId, navigate, UserSubject, Salt, tasks, accessToken])

  return (
    <>
      {(!UserSubject || UserSubject === "" || UserSubject === null) && (
        <>
          <h1>Task Page</h1>
          <p>Not logged in</p>
        </>
      )}
      {(!Salt || Salt === "") && (
        <>
          <h1>Task Page</h1>
          <p>Not logged in</p>
        </>
      )}
      {(filteredTask && filteredTask.id !== "") && (
        <TodoForm
          todos={tasks}
          todoSetter={setTasks}
          todoItem={filteredTask}
          cancelCallback={handleCallback}
          completeCallback={handleComplete}
        />
      )}
    </>
  )
}

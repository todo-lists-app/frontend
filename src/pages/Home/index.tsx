import React, { FC } from "react";
import {Box, Heading, Paragraph} from "dracula-ui";

export const Home: FC = () => {
    return (
      <Box>
        <Box>
          <Heading>Secure Your Tasks, Simplify Your Life</Heading>
          <Paragraph>
            Welcome to Todo-List.app - your go-to for focused, organized, and secure task management. We're committed to keeping your data yours, always.
          </Paragraph>
        </Box>
        <Box>
          <Heading>Find Your Focus</Heading>
          <Paragraph>
            Todo-List.app helps you clear your mind by automatically sorting your tasks into Today, Upcoming and custom Filter views, allowing you to concentrate on what's truly important.
          </Paragraph>
        </Box>
        <Box>
          <Heading>Simple Yet Powerful Privacy-Oriented Task Management</Heading>
          <Paragraph>
            Join the growing community of people who trust Todo-List.app to securely manage their tasks for work, education, and personal life. We are with you everywhere, on any device or platform.
          </Paragraph>
        </Box>
        <Box>
          <Heading>Make Todo-List.app Yours</Heading>
          <Paragraph>
            Customize your to-do list with filters, labels, priorities, and more. Your tasks, your way.
          </Paragraph>
        </Box>
        <Box>
          <Heading>A To-Do List You Can Trust</Heading>
          <Paragraph>
            We've been developing Todo-List.app with your data privacy in mind since day one. We are in it for the long haul.
          </Paragraph>
        </Box>
        <Box>
          <Heading>Find Peace of Mind with Todo-List.app</Heading>
          <Paragraph>
            Start for free. Join the community of individuals who manage their tasks securely and efficiently with Todo-List.app.
          </Paragraph>
        </Box>
      </Box>
    );
}

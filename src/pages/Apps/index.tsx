import React, {FC} from "react";
import {Box, Heading, Paragraph} from "dracula-ui";

export const Apps: FC = () => {
  return (
    <Box>
      <Heading>Upcoming App</Heading>
      <Paragraph>
        We are excited to announce an upcoming app that will revolutionize your task management experience. Our new app is a state-of-the-art to-do application that focuses on privacy and security with its end-to-end encryption feature.
      </Paragraph>
      <Paragraph>
        The app will be available on multiple platforms, ensuring that you can stay organized and in control no matter which device you use. Here are the platforms we are currently developing for:
      </Paragraph>
      <Box>
        <Heading>Wayland Native (GTK)</Heading>
        <Paragraph>
          Our app will have native support for Wayland with a GTK-based interface. We understand the importance of seamless integration with the Wayland display server and aim to deliver an optimized experience for Linux users.
        </Paragraph>
      </Box>
      <Box>
        <Heading>iOS Native</Heading>
        <Paragraph>
          For iPhone and iPad users, our app will be available as a native iOS application. You can expect a sleek and intuitive interface designed specifically for iOS devices, taking full advantage of the platform's capabilities.
        </Paragraph>
      </Box>
      <Box>
        <Heading>Android</Heading>
        <Paragraph>
          Android users can look forward to our app being available on the Google Play Store. Whether you use a smartphone or a tablet, our app will provide a seamless experience across different Android devices, making it easy to manage your tasks on the go.
        </Paragraph>
        <Paragraph>
          The android app is being built with foldable as first class citizen rather than an afterthought.
        </Paragraph>
      </Box>
      <Box>
        <Heading>Windows</Heading>
        <Paragraph>
          Our app will be compatible with Windows, catering to users of this widely-used operating system. The Windows version will offer a familiar and efficient interface, ensuring a smooth transition for those accustomed to managing tasks on their Windows devices.
        </Paragraph>
      </Box>
      <Box>
        <Heading>macOS Native</Heading>
        <Paragraph>
          Mac users will be able to enjoy the full power of our app with a native macOS version. Designed specifically for the macOS environment, our app will integrate seamlessly with other native applications, providing a seamless and efficient task management experience.
        </Paragraph>
      </Box>
      <Box>
        <Heading>Reason behind native</Heading>
        <Paragraph>
          We want to emphasize that our app is not built using Electron. Instead, we have opted for a more optimized approach to ensure optimal performance and efficiency on each platform. We believe this decision will result in a superior user experience for all our users.
        </Paragraph>
        <Paragraph>
          We are currently working hard on bringing this exciting app to life, and we can't wait to share it with you. Stay tuned for updates on our progress and release dates. Sign up for our newsletter to be among the first to know when our app becomes available.
        </Paragraph>
      </Box>
    </Box>
  );
};

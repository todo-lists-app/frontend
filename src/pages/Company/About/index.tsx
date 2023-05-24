import React, {FC} from "react";
import {Box, Heading, Paragraph} from "dracula-ui";

export const About: FC = () => {
  return (
    <Box>
      <Box>
        <Heading>About Our Company</Heading>
        <Paragraph>We are a UK-based, privacy-focused to-do list service provider that firmly believes in keeping your data exactly where it belongs - with you. Our commitment to your privacy and data security is at the forefront of what we do and influences every aspect of our business.</Paragraph>
      </Box>
      <Box>
        <Heading>Our Mission</Heading>
        <Paragraph>Our mission is to empower individuals and businesses with reliable, user-friendly and privacy-conscious productivity tools. We aspire to become your trusted ally in managing your tasks efficiently while safeguarding your personal information.</Paragraph>
      </Box>
      <Box>
        <Heading>Our History</Heading>
        <Paragraph>Founded in the heart of the UK, we have grown from a small startup into a leading provider of to-do list services. Our roots in privacy-focused software solutions set us apart from the beginning. We pride ourselves on this tradition, continually evolving to meet the changing demands of modern life without ever compromising on our values.</Paragraph>
      </Box>
      <Box>
        <Heading>Our Product</Heading>
        <Paragraph>Our primary offering is a robust, secure and user-friendly to-do list application. Designed with privacy at its core, our product uses advanced encryption technologies to ensure your data remains inaccessible to unauthorized parties. We also provide open-source versions of our software, allowing for transparency and fostering trust in our service.</Paragraph>
      </Box>
      <Box>
        <Heading>Our Values</Heading>
        <Paragraph>We are guided by a core set of values: respect for user privacy, commitment to open source, and passion for usability. Our unwavering dedication to these principles allows us to offer a product that is not only effective, but also respects your digital rights.</Paragraph>
      </Box>
      <Box>
        <Heading>Join Us</Heading>
        <Paragraph>We invite you to join our mission to revolutionize productivity while preserving privacy. Start using our to-do list service today, and experience the peace of mind that comes from knowing your data is secure and your privacy is respected.</Paragraph>
      </Box>
    </Box>
  );
};

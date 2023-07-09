import React, {FC} from "react";
import {Box, Heading, Paragraph} from "dracula-ui";

export const Terms: FC = () => {
  return (
    <Box>
      <Box>
        <Heading>TERMS AND CONDITIONS</Heading>
        <Paragraph>
          These terms and conditions ("Terms") govern your use of the Todo Service ("Service") provided by Todo-List.app ("Provider"). By using the Service, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not use the Service.
        </Paragraph>
      </Box>
      <Box>
        <Heading size="md">Privacy and Security</Heading>
        <Paragraph>
          The Service utilizes end-to-end encryption to protect your todo data. This means that your todo items and associated information are encrypted on your device before being transmitted to our servers. Only you, as the user, possess the encryption key necessary to decrypt and access your data. The Provider does not have access to your unencrypted data. However, it is your responsibility to ensure the confidentiality of your encryption key and keep it secure.
        </Paragraph>
      </Box>
      <Box>
        <Heading size="md">User Responsibilities</Heading>
        <Paragraph>
          You are solely responsible for the accuracy, legality, and reliability of the content you create, store, or transmit using the Service. You must not use the Service for any unlawful, harmful, or malicious activities. You agree to use the Service in compliance with all applicable laws and regulations.
        </Paragraph>
      </Box>
      <Box>
        <Heading size="md">Data Ownership and Protection</Heading>
        <Paragraph>
          You retain all ownership rights to the data you create or store using the Service. The Provider does not claim ownership over any of your data. We will take reasonable measures to protect your data from unauthorized access, loss, or disclosure. However, no method of data transmission or storage is completely secure, and the Provider cannot guarantee absolute security.
        </Paragraph>
      </Box>
      <Box>
        <Heading size="md">Service Availability and Modifications</Heading>
        <Paragraph>
          The Provider strives to maintain the availability and reliability of the Service. However, we do not guarantee uninterrupted access to the Service, and we reserve the right to modify, suspend, or discontinue the Service, or any part thereof, with or without notice. The Provider shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.
        </Paragraph>
      </Box>
      <Box>
        <Heading size="md">Limitation of Liability</Heading>
        <Paragraph>
          To the maximum extent permitted by law, the Provider and its affiliates shall not be liable for any indirect, incidental, special, consequential, or exemplary damages arising out of or in connection with the use of the Service. This includes, but is not limited to, damages for loss of profits, data, or other intangible losses, even if the Provider has been advised of the possibility of such damages.
        </Paragraph>
      </Box>
      <Box>
        <Heading size="md">Compliance with GDPR</Heading>
        <Paragraph>
          The Provider is committed to complying with the General Data Protection Regulation (GDPR) to the extent applicable. We collect and process personal data in accordance with our Privacy Policy, which outlines our practices regarding the collection, storage, use, and disclosure of personal information. By using the Service, you consent to the collection and processing of your personal data as described in our Privacy Policy.
        </Paragraph>
      </Box>
      <Box>
        <Heading size="md">Governing Law and Jurisdiction</Heading>
        <Paragraph>
          These Terms shall be governed by and construed in accordance with the laws of the UK. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of the UK.
        </Paragraph>
      </Box>
      <Box>
        <Heading size="md">Severability</Heading>
        <Paragraph>
          If any provision of these Terms is found to be invalid or unenforceable, such provision shall be severed from the Terms without affecting the validity or enforceability of the remaining provisions.
        </Paragraph>
      </Box>
      <Box>
        <Heading size="md">Exportability of Data</Heading>
        <Paragraph>
          In the event that you cancel the Service or choose to terminate your account, you have the option to export your data in the todo.txt format. This format allows you to retrieve and save your todo items and associated information in a readable and portable manner. The Provider will provide the necessary tools or instructions to facilitate the data export process.
        </Paragraph>
      </Box>
      <Box>
        <Heading size="md">Entire Agreement</Heading>
        <Paragraph>
          These Terms constitute the entire agreement between you and the Provider regarding the Service and supersede any prior or contemporaneous agreements, communications, or understandings, whether oral or written.
        </Paragraph>
        <Paragraph>
          Please read these Terms carefully before using the Service. By using the Service, you acknowledge that you have read, understood, and agreed to be bound by these Terms.
        </Paragraph>
      </Box>
    </Box>
  );
};

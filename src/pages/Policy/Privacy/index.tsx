import React, {FC} from "react";
import {Box, Heading, OrderedList, Paragraph, Text} from "dracula-ui";

export const Privacy: FC = () => {
  return (
    <Box>
      <Box>
        <Heading>PRIVACY POLICY</Heading>
        <Paragraph>
          This Privacy Policy ("Policy") describes how Todo-List.app ("Provider," "we," or "us") collects, uses, and protects the personal information you ("User" or "you") provide while using the Todo Service ("Service"). We are committed to protecting your privacy and maintaining the confidentiality of your personal information. By using the Service, you consent to the data practices described in this Policy.
        </Paragraph>
      </Box>
      <Box>
        <Heading size="md">1. Information Collection</Heading>
        <Text>
          We may collect personal information from you when you voluntarily provide it while using the Service. This information may include, but is not limited to:
          <OrderedList>
            <li>Your name, email address, and other contact information provided during account registration.</li>
            <li>Your todo items, associated notes, and any other content you create or store using the Service.</li>
            <li>Information obtained through your interactions with the Service, such as usage data, IP addresses, and device information.</li>
          </OrderedList>
        </Text>
      </Box>
      <Box>
        <Heading size="md">2. Information Use</Heading>
        <Text>
          We use the personal information collected for the following purposes:
          <OrderedList>
            <li>To provide and maintain the Service, including account management and customer support.</li>
            <li>To personalize and improve your experience with the Service.</li>
            <li>To send you important notifications and updates related to the Service.</li>
            <li>To analyze and monitor usage patterns and trends to enhance the Service's performance and functionality.</li>
            <li>To enforce our Terms and Conditions and comply with applicable legal requirements.</li>
          </OrderedList>
        </Text>
      </Box>
      <Box>
        <Heading size="md">3. Information Sharing</Heading>
        <Text>
          We do not sell, trade, or rent your personal information to third parties without your consent. However, we may share your information in the following circumstances:
          <OrderedList>
            <li>With trusted third-party service providers who assist us in delivering the Service and performing related functions.</li>
            <li>In response to a legal request, such as a court order or government inquiry, when required by law, or to protect our rights, property, or safety.</li>
            <li>In the event of a merger, acquisition, or sale of all or a portion of our assets, your personal information may be transferred as part of the transaction.</li>
          </OrderedList>
        </Text>
      </Box>
      <Box>
        <Heading size="md">4. Data Security</Heading>
        <Paragraph>
          We employ industry-standard security measures to safeguard your personal information from unauthorized access, disclosure, alteration, and destruction. These measures include encryption, access controls, and regular security assessments. However, no method of data transmission or storage is completely secure, and we cannot guarantee absolute security.
        </Paragraph>
      </Box>
      <Box>
        <Heading size="md">5. Data Retention</Heading>
        <Paragraph>
          We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Policy, unless a longer retention period is required or permitted by law. When your personal information is no longer needed, we will securely dispose of it in accordance with applicable laws and regulations.
        </Paragraph>
      </Box>
      <Box>
        <Heading size="md">6. Children's Privacy</Heading>
        <Paragraph>
          The Service is not intended for use by individuals under the age of 16. We do not knowingly collect personal information from children. If you become aware that a child has provided us with their personal information without parental consent, please contact us, and we will take appropriate steps to remove the information and terminate the child's account.
        </Paragraph>
      </Box>
      <Box>
        <Heading size="md">7. Changes to this Policy</Heading>
        <Paragraph>
          We may update this Privacy Policy from time to time to reflect changes in our data practices or legal requirements. We will notify you of any significant changes by posting the updated Policy on our website or through other communication channels. We encourage you to review this Policy periodically for the latest information on our privacy practices.
        </Paragraph>
      </Box>
      <Box>
        <Heading size="md">8. Contact Us</Heading>
        <Paragraph>
          If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at policies-a.t-chewedfeed.com. We will respond to your inquiry as soon as possible.
        </Paragraph>
      </Box>
    </Box>
  );
};

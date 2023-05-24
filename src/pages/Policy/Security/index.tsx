import React, {FC} from "react";
import {Box, Heading, OrderedList, Paragraph} from "dracula-ui";

export const Security: FC = () => {
  return (
    <Box>
      <Box>
        <Heading>SECURITY POLICY</Heading>
        <Paragraph>
          This Security Policy ("Policy") outlines the security measures implemented by Todo-List.app ("Provider," "we," or "us") to protect the confidentiality, integrity, and availability of the Todo Service ("Service") and the data stored within it. We are committed to maintaining a secure environment for our users. By using the Service, you acknowledge and agree to the security practices described in this Policy.
        </Paragraph>
      </Box>
      <Box>
        <Heading size="md">1. Data Encryption</Heading>
          <Paragraph>
            We utilize end-to-end encryption to protect your todo data. This means that your todo items and associated information are encrypted on your device before being transmitted to our servers. Only you, as the user, possess the encryption key necessary to decrypt and access your data. The Provider does not have access to your unencrypted data.
          </Paragraph>
      </Box>
      <Box>
        <Heading size="md">2. Access Controls</Heading>
        <Paragraph>
          We implement strict access controls to limit access to the Service and your data. These controls include:
          <OrderedList>
            <li>User authentication mechanisms to ensure that only authorized users can access the Service.</li>
            <li>Role-based access controls to grant different levels of access based on user roles and responsibilities.</li>
            <li>Regular review and monitoring of access privileges to ensure they are appropriate and up to date.</li>
          </OrderedList>
        </Paragraph>
      </Box>
      <Box>
        <Heading size="md">3. Infrastructure Security</Heading>
        <Paragraph>
          We employ industry-standard security practices to protect the underlying infrastructure supporting the Service. These practices include:
          <OrderedList>
            <li>Regular security assessments and vulnerability scans to identify and remediate potential vulnerabilities.</li>
            <li>Firewalls, intrusion detection systems, and other security measures to protect against unauthorized access and attacks.</li>
            <li>Regular updates and patch management to ensure the latest security patches and updates are applied to our systems.</li>
          </OrderedList>
        </Paragraph>
      </Box>
      <Box>
        <Heading size="md">4. Data Backup and Disaster Recovery</Heading>
        <Paragraph>
          We have implemented comprehensive data backup and disaster recovery procedures to ensure the availability and integrity of your data. These procedures include:
          <OrderedList>
            <li>Regular and automated backups of your data to prevent data loss in the event of a system failure or disaster.</li>
            <li>Testing and verification of the backup and recovery processes to ensure their effectiveness.</li>
            <li>Offsite storage of backups to protect against physical damage or loss of data.</li>
          </OrderedList>
        </Paragraph>
      </Box>
      <Box>
        <Heading size="md">5. Employee Training and Awareness</Heading>
        <Paragraph>
          We provide regular training and awareness programs for our employees to educate them about security best practices and their roles in maintaining a secure environment. This includes:
          <OrderedList>
            <li>Security awareness training to ensure employees understand their responsibilities in safeguarding user data and protecting against security threats.</li>
            <li>Ongoing education about emerging security risks and best practices to stay informed and proactive in maintaining security.</li>
          </OrderedList>
        </Paragraph>
      </Box>
      <Box>
        <Heading size="md">6. Incident Response</Heading>
        <Paragraph>
          We have established an incident response process to promptly and effectively respond to security incidents. This includes:
          <OrderedList>
            <li>Incident identification, investigation, and containment procedures to mitigate the impact of security incidents.</li>
            <li>Prompt notification and communication with affected users in the event of a data breach or other significant security incident.</li>
            <li>Collaboration with relevant authorities and regulatory bodies, if necessary, in accordance with applicable laws and regulations.</li>
          </OrderedList>
        </Paragraph>
      </Box>
      <Box>
        <Heading size="md">7. Compliance with Laws and Regulations</Heading>
        <Paragraph>
          We are committed to complying with all applicable laws and regulations regarding data security and privacy. We regularly review our security practices to ensure compliance with evolving legal requirements and industry standards.
        </Paragraph>
      </Box>
      <Box>
        <Heading size="md">8. Third-Party Security</Heading>
        <Paragraph>
          We carefully select and assess the security practices of any third-party vendors or service providers we engage with. We ensure that they adhere to stringent security measures to protect your data and maintain the integrity of the Service.
        </Paragraph>
      </Box>
    </Box>
  );
};

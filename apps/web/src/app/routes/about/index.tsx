import * as React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AUTHOR_GITHUB_URL } from '../../constants';

const accordionStyle = {
  backgroundColor: '#1a73e8',
  color: 'white',
};

export const About = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      width='100%'
      justifyContent='center'
      alignItems='center'
      display='flex'
      marginTop={'10px'}
    >
      <Box
        padding='20px'
        maxWidth={1000}
      >
        <Accordion
          sx={accordionStyle}
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography
              variant='subtitle1'
              sx={{ width: '33%', flexShrink: 0 }}
            >
              Privacy policy
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant='body2' gutterBottom>
              Shqipet is committed to protecting the privacy of its users. This Privacy Policy describes how we
              collect, use, and disclose personal information when you visit our website or use our services. By using our
              website or services, you consent to the terms of this Privacy Policy.
            </Typography>

            <Typography variant="overline" display="block" gutterBottom><b>Information We Collect</b></Typography>

            <Typography variant='body2' gutterBottom>
              We may collect personal information such as your name, email address, and other contact details when you
              voluntarily submit them to us through our website or services.
            </Typography>


            <Typography variant="overline" display="block" gutterBottom><b>Use of Information</b></Typography>

            <Typography variant='body2' gutterBottom>
              We may use personal information to respond to your inquiries, provide our services, and communicate with you
            </Typography>

            <Typography variant="overline" display="block" gutterBottom><b>Disclosure of Information</b></Typography>

            <Typography variant='body2' gutterBottom>
              We may disclose personal information to third-party service providers or business partners who assist us in
              operating our website or providing our services. We may also disclose information in response to legal
              obligations, enforce our policies, or protect our rights or the rights of others.
            </Typography>

            <Typography variant="overline" display="block" gutterBottom><b>Cookies</b></Typography>

            <Typography variant='body2' gutterBottom>
              We may use cookies to enhance user experience and collect information about how our website is used. You can
              modify your browser settings to disable cookies; however, this may affect certain features or functionality of
              our website.
            </Typography>

            <Typography variant="overline" display="block" gutterBottom><b>Data Security</b></Typography>

            <Typography variant='body2' gutterBottom>
              We implement security measures to protect your personal information from unauthorized access, alteration, or
              disclosure. However, please be aware that no method of transmission over the internet or electronic storage is
              100% secure.
            </Typography>

            <Typography variant="overline" display="block" gutterBottom><b>Changes to this Privacy Policy</b></Typography>

            <Typography variant='body2' gutterBottom>
              We reserve the right to modify this Privacy Policy at any time. Any changes will be effective immediately upon
              posting. We encourage you to review this Privacy Policy periodically to stay informed about how we are
              protecting and using your information.
            </Typography>

            <Typography variant="overline" display="block" gutterBottom><b>Contact Us</b></Typography>

            <Typography variant='body2' gutterBottom>
              If you have any questions or concerns about this privacy policy, please contact the website admin.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={accordionStyle}
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography
              variant='subtitle1'
              sx={{ width: '33%', flexShrink: 0 }}
            >
              Author
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant='body2' gutterBottom>
                I am doing this project for fun and to learn new things. I am not a professional developer, so I am sure there are many things that I could have done better.
                If you have any suggestions, please let me know.
            </Typography>
            <Typography variant='body2' gutterBottom>
              <a
                style={{ color: 'black'}}
                target='_blank'
                rel="noreferrer"
                href={AUTHOR_GITHUB_URL}
              >
                alb_xh
              </a>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}

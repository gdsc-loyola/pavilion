import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import logo from '../../../../static/assets/gdsc_logo.svg';
import { colors, typography } from '$lib/theme';
const DataPrivacyModal = (props) => {
  const { children, ...rest } = props;
  return (
    <Modal {...rest}>
      <Box
        sx={{
          outline: 'none',
          position: 'absolute',
          top: '50%',
          left: '50%',
          backgroundColor: 'white',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '600px',
          boxShadow: 24,
        }}
      >
        <Box
          sx={{
            height: '80px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08)',
          }}
        >
          <img src={logo} alt="Logo" className="logo" />
        </Box>
        <Box
          sx={{
            padding: '28px 78px',
            overflowY: 'scroll',
            height: '402px',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#498AF4',
            },
            '&::-webkit-scrollbar-track': {
              marginBottom: '-118px',
            },
          }}
        >
          <Typography
            sx={{
              marginBottom: '24px',
              color: colors.gray[700],
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.med,
            }}
          >
            Privacy policy
          </Typography>
          <Typography
            sx={{
              marginBottom: '24px',
              color: colors.gray[700],
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.reg,
            }}
          >
            We respect your privacy and are committed to protecting it through our compliance with
            this privacy policy (“Policy”). This Policy describes the types of information we may
            collect from you or that you may provide (“Personal Information”) on the
            [gpavilion.org](http://gpavilion.org/) website (“Website” or “Service”) and any of its
            related products and services (collectively, “Services”), and our practices for
            collecting, using, maintaining, protecting, and disclosing that Personal Information. It
            also describes the choices available to you regarding our use of your Personal
            Information and how you can access and update it. <br />
            <br />
            This Policy is a legally binding agreement between you (“User”, “you” or “your”) and
            this Website operator (“Operator”, “we”, “us” or “our”). If you are entering into this
            agreement on behalf of a business or other legal entity, you represent that you have the
            authority to bind such entity to this agreement, in which case the terms “User”, “you”
            or “your” shall refer to such entity. If you do not have such authority, or if you do
            not agree with the terms of this agreement, you must not accept this agreement and may
            not access and use the Website and Services. By accessing and using the Website and
            Services, you acknowledge that you have read, understood, and agree to be bound by the
            terms of this Policy. This Policy does not apply to the practices of companies that we
            do not own or control, or to individuals that we do not employ or manage. This privacy
            policy was created with the help of the [privacy policy
            generator](https://www.websitepolicies.com/privacy-policy-generator).
          </Typography>
          <Typography
            sx={{
              marginBottom: '24px',
              color: colors.gray[700],
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.med,
            }}
          >
            Automatic collection of information
          </Typography>
          <Typography
            sx={{
              marginBottom: '24px',
              color: colors.gray[700],
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.reg,
            }}
          >
            We respect your privacy and are committed to protecting it through our compliance with
            this privacy policy (“Policy”). This Policy describes the types of information we may
            collect from you or that you may provide (“Personal Information”) on the
            [gpavilion.org](http://gpavilion.org/) website (“Website” or “Service”) and any of its
            related products and services (collectively, “Services”), and our practices for
            collecting, using, maintaining, protecting, and disclosing that Personal Information. It
            also describes the choices available to you regarding our use of your Personal
            Information and how you can access and update it. <br />
            <br />
            This Policy is a legally binding agreement between you (“User”, “you” or “your”) and
            this Website operator (“Operator”, “we”, “us” or “our”). If you are entering into this
            agreement on behalf of a business or other legal entity, you represent that you have the
            authority to bind such entity to this agreement, in which case the terms “User”, “you”
            or “your” shall refer to such entity. If you do not have such authority, or if you do
            not agree with the terms of this agreement, you must not accept this agreement and may
            not access and use the Website and Services. By accessing and using the Website and
            Services, you acknowledge that you have read, understood, and agree to be bound by the
            terms of this Policy. This Policy does not apply to the practices of companies that we
            do not own or control, or to individuals that we do not employ or manage. This privacy
            policy was created with the help of the [privacy policy
            generator](https://www.websitepolicies.com/privacy-policy-generator).
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '35px',
          }}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default DataPrivacyModal;

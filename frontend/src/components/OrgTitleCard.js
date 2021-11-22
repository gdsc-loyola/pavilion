import React from 'react'
import { Card, Box, Typography, Avatar, useTheme, IconButton } from "@mui/material";
import { colors, typography } from '../lib/theme'

const OrgTitleCard = (props) => {
    const { orgBody, logoSrc, orgName, shortOrgName} = props;
    const theme = useTheme();

    const OrgBodyTag = ({ body }) => {
        return (
          <Box sx={{
            backgroundColor: body === 'coa' ? colors.red[100] : body === 'lions' ? colors.yellow[100] : colors.blue[100],
            width: 'fit-content',
            height: 'fit-content',
            flexGrow: '0',
            padding: '4px 8px',
            borderRadius: '4px'
          }}>
            <Typography
              color={body === 'coa' ? colors.red[400] : body === 'lions' ? colors.yellow[500] : colors.blue[400]}
              fontSize={typography.fontSize.xs}
            >
              {body.toUpperCase()}
            </Typography>
          </Box>
        )
    }

    return (
        <Card sx={{ padding: '24px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08)'}}>
            <Box sx={{
                display: 'flex', 
                flexDirection: 'row'
            }}>
                <Avatar 
                    sx = {{ 
                        width: 172, 
                        height: 172, 
                        marginRight: '24px' 
                    }} 
                    src={logoSrc} 
                    aria-label="logo"
                />
                <Box 
                    sx = {{
                        display: 'flex', 
                        flexDirection: 'column',
                        marginTop: '30px'
                }}> 
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Typography color={colors.gray[700]} sx={{marginRight: '16px', fontWeight: typography.fontWeight.med, fontSize: typography.fontSize.lg}}>
                            {orgName}
                        </Typography>
                        <OrgBodyTag body={orgBody}/>
                    </Box>
                    <Typography color={colors.gray[700]} sx={{marginTop: '8px', fontWeight: typography.fontWeight.reg, fontSize: typography.fontSize.base}}>
                        {shortOrgName}
                    </Typography>
                    <Box sx={{marginTop: '16px', display: 'flex', flexDirection: 'row'}}>
                        <IconButton disableRipple sx={{marginRight: '16px', padding: '0', '&:hover': {fill: colors.blue[400], backgroundColor: '#FFFFFF'}, fill: colors.gray[500]}}>
                              <svg style={{fill: 'inherit'}} width="24" height="24"><path d="M21.41 8.64v-.05a10 10 0 0 0-18.78 0v.05a9.86 9.86 0 0 0 0 6.72v.05a10 10 0 0 0 18.78 0v-.05a9.86 9.86 0 0 0 0-6.72ZM4.26 14a7.82 7.82 0 0 1 0-4h1.86a16.73 16.73 0 0 0 0 4H4.26Zm.82 2h1.4c.234.892.57 1.754 1 2.57A7.999 7.999 0 0 1 5.08 16Zm1.4-8h-1.4a8 8 0 0 1 2.37-2.57A12.15 12.15 0 0 0 6.48 8ZM11 19.7A6.34 6.34 0 0 1 8.57 16H11v3.7Zm0-5.7H8.14a14.36 14.36 0 0 1 0-4H11v4Zm0-6H8.57A6.34 6.34 0 0 1 11 4.3V8Zm7.92 0h-1.4a12.148 12.148 0 0 0-1-2.57A8 8 0 0 1 18.92 8ZM13 4.3A6.34 6.34 0 0 1 15.43 8H13V4.3Zm0 15.4V16h2.43A6.34 6.34 0 0 1 13 19.7Zm2.86-5.7H13v-4h2.86a14.36 14.36 0 0 1 0 4Zm.69 4.57c.429-.816.764-1.678 1-2.57h1.4a7.999 7.999 0 0 1-2.4 2.57ZM19.74 14h-1.86c.08-.663.12-1.331.12-2a16.285 16.285 0 0 0-.12-2h1.86a7.82 7.82 0 0 1 0 4Z"/></svg>
                        </IconButton>
                        <IconButton disableRipple sx={{marginRight: '16px', padding: '0', '&:hover': {fill: colors.blue[400], backgroundColor: '#FFFFFF'}, fill: colors.gray[500]}}>
                            <svg style={{fill: 'inherit'}} width="24" height="24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95Z"/></svg>
                        </IconButton>
                        <IconButton disableRipple sx={{marginRight: '16px', padding: '0', '&:hover': {fill: colors.blue[400], backgroundColor: '#FFFFFF'}, fill: colors.gray[500]}}>  
                            <svg style={{fill: 'inherit'}} width="24" height="24"><path d="M12 9.52a2.48 2.48 0 1 0 0 4.96 2.48 2.48 0 0 0 0-4.96Zm9.93-2.45a6.532 6.532 0 0 0-.42-2.26 4 4 0 0 0-2.32-2.32 6.53 6.53 0 0 0-2.26-.42C15.64 2 15.26 2 12 2s-3.64 0-4.93.07a6.53 6.53 0 0 0-2.26.42 4 4 0 0 0-2.32 2.32 6.53 6.53 0 0 0-.42 2.26C2 8.36 2 8.74 2 12s0 3.64.07 4.93a6.86 6.86 0 0 0 .42 2.27c.2.526.51 1.004.91 1.4.398.402.88.713 1.41.91a6.532 6.532 0 0 0 2.26.42C8.36 22 8.74 22 12 22s3.64 0 4.93-.07a6.532 6.532 0 0 0 2.26-.42 3.89 3.89 0 0 0 1.41-.91c.4-.396.71-.874.91-1.4a6.6 6.6 0 0 0 .42-2.27C22 15.64 22 15.26 22 12s0-3.64-.07-4.93Zm-2.54 8a5.73 5.73 0 0 1-.39 1.8A3.86 3.86 0 0 1 16.87 19a5.73 5.73 0 0 1-1.81.35H8.94A5.73 5.73 0 0 1 7.13 19a3.51 3.51 0 0 1-1.31-.86A3.51 3.51 0 0 1 5 16.87a5.49 5.49 0 0 1-.34-1.81V8.94A5.49 5.49 0 0 1 5 7.13a3.51 3.51 0 0 1 .86-1.31c.36-.36.793-.64 1.27-.82a5.73 5.73 0 0 1 1.81-.35h6.12a5.73 5.73 0 0 1 1.81.35 3.51 3.51 0 0 1 1.31.86c.362.359.642.792.82 1.27a5.73 5.73 0 0 1 .35 1.81V12c0 2.06.07 2.27.04 3.06v.01Zm-1.6-7.44a2.38 2.38 0 0 0-1.41-1.41A4 4 0 0 0 15 6H9a4 4 0 0 0-1.38.26 2.38 2.38 0 0 0-1.41 1.36A4.27 4.27 0 0 0 6 9v6c.01.471.098.938.26 1.38a2.38 2.38 0 0 0 1.41 1.41 4.27 4.27 0 0 0 1.33.26h6a4 4 0 0 0 1.38-.26 2.38 2.38 0 0 0 1.41-1.41 4 4 0 0 0 .26-1.38V9c0-.472-.088-.94-.26-1.38v.01ZM12 15.82A3.81 3.81 0 0 1 8.19 12 3.82 3.82 0 1 1 12 15.82Zm4-6.89a.9.9 0 0 1 0-1.79.9.9 0 0 1 0 1.79Z"/></svg>
                        </IconButton>
                        <IconButton disableRipple sx={{marginRight: '16px', padding: '0', '&:hover': {fill: colors.blue[400], backgroundColor: '#FFFFFF'}, fill: colors.gray[500]}}>
                            <svg style={{fill: 'inherit'}} width="24" height="24"><path d="M20.47 2H3.53a1.45 1.45 0 0 0-1.47 1.43v17.14A1.45 1.45 0 0 0 3.53 22h16.94a1.45 1.45 0 0 0 1.47-1.43V3.43A1.451 1.451 0 0 0 20.47 2ZM8.09 18.74h-3v-9h3v9ZM6.59 8.48a1.56 1.56 0 0 1 0-3.12 1.57 1.57 0 1 1 0 3.12Zm12.32 10.26h-3v-4.83c0-1.21-.43-2-1.52-2A1.65 1.65 0 0 0 12.85 13a2.003 2.003 0 0 0-.1.73v5h-3v-9h3V11a3.001 3.001 0 0 1 2.71-1.5c2 0 3.45 1.29 3.45 4.06v5.18Z"/></svg>
                        </IconButton>
                        <IconButton href="#" disableRipple sx={{marginRight: '16px', padding: '0', '&:hover': {fill: colors.blue[400], backgroundColor: '#FFFFFF'}, fill: colors.gray[500]}}>
                            <svg style={{fill: 'inherit'}} width="24" height="24"><path d="M22 5.8a8.49 8.49 0 0 1-2.36.64 4.13 4.13 0 0 0 1.81-2.27 8.21 8.21 0 0 1-2.61 1 4.1 4.1 0 0 0-7 3.74 11.64 11.64 0 0 1-8.45-4.29 4.16 4.16 0 0 0-.55 2.07 4.09 4.09 0 0 0 1.82 3.41 4.05 4.05 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.3 4 3.929 3.929 0 0 1-1.1.17 4.896 4.896 0 0 1-.77-.07 4.11 4.11 0 0 0 3.83 2.84A8.22 8.22 0 0 1 2 18.28a11.57 11.57 0 0 0 6.29 1.85A11.59 11.59 0 0 0 20 8.45v-.53a8.43 8.43 0 0 0 2-2.12Z"/></svg>
                        </IconButton>
                    </Box>
                </Box>
            </Box> 
        </Card>
    )
}

export default OrgTitleCard

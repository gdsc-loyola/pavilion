import React from "react";
import { Card, CardContent, CardMedia, Typography, CardHeader, Avatar } from "@mui/material";
import { colors,typography } from '../lib/theme'
/**
 * @description A MUI TextField with a react-hook-form Controller wrapper
 * @param {Omit<ControllerProps, 'render'> & React.ComponentPropsWithoutRef<typeof TextField>} props
 * @returns {React.Component}
 */

const EventCard = (props) => {
    const { imgSrc, alt, eventName, startDate, endDate, logoSrc, logoName } = props;
    return (
        <Card sx={{ maxWidth: 368, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08)'}}>
            <CardMedia
                component="img"
                height="92"
                image={imgSrc}
                alt={alt}
            />
            <CardContent sx={{paddingBottom: '0', marginBottom: '16px'}}>
                <Typography sx={{fontWeight: 600, fontSize: '20px', marginBottom: '8px'}} color={colors.gray[700]} component="p">
                    {eventName}
                </Typography>
                <Typography sx={{fontWeight: typography.fontWeight.reg, fontSize: '16px'}} color={colors.gray[700]} variant="body2">
                    {startDate} - {endDate}
                </Typography>
            </CardContent>
            <CardHeader
                sx={{paddingTop: '0'}}
                avatar={
                    <Avatar sx={{ width: 24, height: 24 }} src={logoSrc} aria-label="logo"/>
                }
                title={logoName}
                titleTypographyProps = {{ 
                    sx: {
                        fontWeight: typography.fontWeight.reg,
                        fontSize: '14px',
                        color: colors.gray[500]
                    }
                }}
            />
        </Card>
    )
}

export default EventCard;
import React from "react";
import { useHistory } from "react-router"
import { Card, CardActionArea, CardContent, CardMedia, Typography, CardHeader, Avatar } from "@mui/material";
import {colors, typography } from '$lib/theme'
/**
 * @description A MUI TextField with a react-hook-form Controller wrapper
 * @param {Omit<ControllerProps, 'render'> & React.ComponentPropsWithoutRef<typeof TextField>} props
 * @returns {React.Component}
 */

const EventCard = (props) => {
    const { imgSrc, alt, eventName, startDate, endDate, logoSrc, logoName } = props;

    const history = useHistory()

    return (
        <Card sx={{ width: '100%', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08)'}}>
          <CardActionArea onClick={() => history.push(`/${logoName.toLowerCase()}/${eventName.toLowerCase()}`)} >
            <CardMedia
                component="img"
                height="92"
                image={imgSrc}
                alt={alt}
            />
            <CardContent sx={{paddingBottom: '0', marginBottom: '16px'}}>
                <Typography sx={{fontWeight: 600, fontSize: '20px', marginBottom: '8px', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} color={colors.gray[700]} component="p">
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
          </CardActionArea>
        </Card>
    )
}

export default EventCard;
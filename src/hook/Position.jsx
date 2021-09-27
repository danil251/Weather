import React from 'react';
import { usePosition } from 'use-position';

export const Demo = () => {
    const watch = true;
    const {
        latitude,
        longitude,
        speed,
        timestamp,
        accuracy,
        error,
    } = usePosition(watch);

    return (
        <code>
            latitude: {latitude}<br/>
            longitude: {longitude}<br/>
            speed: {speed}<br/>
            timestamp: {timestamp}<br/>
            accuracy: {accuracy && `${accuracy}m`}<br/>
            error: {error}
        </code>
    );
};
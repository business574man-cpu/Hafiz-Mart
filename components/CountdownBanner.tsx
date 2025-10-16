import React, { useState, useEffect } from 'react';

const CountdownBanner: React.FC = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date("2025-01-01") - +new Date();
        let timeLeft = { hours: 0, minutes: 0, seconds: 0 };

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const formatTime = (time: number) => {
        // Ensure time is a valid number before calling toString
        return (time || 0).toString().padStart(2, '0');
    }

    return (
        <div className="bg-green-100 text-green-800 p-3 rounded-lg flex items-center">
            <span className="text-2xl mr-3">🚚</span>
            <div>
                <p className="font-bold">Free delivery Hours!</p>
                <p className="text-sm">Abhi order karain aur sab orders per free delivery hasil karain!</p>
            </div>
            <div className="ml-auto flex items-center space-x-1 font-mono font-bold text-lg">
                <span className="bg-white px-2 py-1 rounded-md">{formatTime(timeLeft.hours)}</span>
                <span>:</span>
                <span className="bg-white px-2 py-1 rounded-md">{formatTime(timeLeft.minutes)}</span>
                <span>:</span>
                <span className="bg-white px-2 py-1 rounded-md">{formatTime(timeLeft.seconds)}</span>
            </div>
        </div>
    );
};

export default CountdownBanner;
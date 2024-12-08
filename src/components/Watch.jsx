import React, { useState, useEffect } from "react";

function Watch() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return (
        <div style={styles.watch}>
        <center>
            {time}
        </center>
        </div>
    );
}

const styles = {
    watch: {
        width: "200px",
        position: "fixed",
        top: "10px",
        left: "10px",
        padding: "20px 25px", // Adds inner spacing
        background: "rgba(255, 255, 255, 0.2)", // Semi-transparent white background
        backdropFilter: "blur(10px)", // Applies a frosted glass blur effect
        WebkitBackdropFilter: "blur(10px)", // Safari compatibility
        border: "1px solid rgba(255, 255, 255, 0.3)", // Subtle border for depth
        borderRadius: "15px", // Smooth rounded edges
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Slight shadow for elevation
        color: "whitesmoke", // Black text for readability
        fontWeight: "bold",
        fontSize: "1.4rem",
        zIndex: 100, // Ensures it stays on top
    },
};

export default Watch;

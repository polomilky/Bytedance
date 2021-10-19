const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    res.json({
        "teams": [
            {
                "name": "Dev Team",
                "jobs": [
                    {
                        "name": "Web Engineer",
                        "count": 3
                    },
                    {
                        "name": "iOS Engineer",
                        "count": 1
                    },
                    {
                        "name": "Android Engineer",
                        "count": 1
                    },
                    {
                        "name": "Data Engineer",
                        "count": 3
                    },
                    {
                        "name": "DevOps Engineer",
                        "count": 1
                    }
                ]
            },
            {
                "name": "Product Team",
                "jobs": [
                    {
                        "name": "UI Designer",
                        "count": 2
                    },
                    {
                        "name": "UX Designer",
                        "count": 2
                    },
                    {
                        "name": "Product Manager",
                        "count": 1
                    }
                ]
            },
            {
                "name": "Operation Team",
                "jobs": [
                ]
            }
        ]
    })
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
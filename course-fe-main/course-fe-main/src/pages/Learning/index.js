import { useParams } from "react-router-dom";
import React from "react"

function Learning() {
    const { slug } = useParams();
    return (
        <div>
            Learning {slug}
        </div>
    )
}

export default Learning;
import { css } from 'lit';

export default css`
    .error {
        color: red;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
        text-align: center;
        background-color: rgba(255, 255, 255, 0.7);
        padding: 1em;
        border-radius: 1em;
    }
    
    ha-card {
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: center;
        font-family: Helvetica, sans-serif;
        aspect-ratio: 1 / 1;
}
    
.hour-hand {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: center;
    z-index: 2;
}

.minute-hand {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: center;
    z-index: 2;
}

`;
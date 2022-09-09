import { useMachine } from '@xstate/react';
import { lightMachine } from './machines/light-machine-machines';
import Typography from "@mui/material/Typography";

export const LightMachine = () => {
    const [state, send] = useMachine(lightMachine);

    return (
        <>
            <div>
                <Typography>
                    Trip the light fantastic!
                </Typography>
            </div>
        </>
    )
}

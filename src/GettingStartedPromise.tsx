import { Button, Typography } from '@mui/material';

import { useMachine } from '@xstate/react';
import { promiseMachine } from './machines/promise';

const StateMessage = ({ isMatching, text }: { isMatching: boolean, text: string }) => (
    <>
        {isMatching &&
            <Typography alignItems="center">
                Loading
            </Typography>}
    </>
);

export const GettingStartedPromise = () => {
    const [state, send] = useMachine(promiseMachine);

    return (
        <>
            {/** One can listen to the state of the service */}
            {state.matches('pending') && <Typography>Loading</Typography>}
            { state.matches('rejected') && <Typography>Rejected</Typography> }
            { state.matches('resolved') && <Typography>Resolved</Typography> }
            <div>
                {/** One can send events to the running service */}
                <Button onClick={() => send('RESOLVE')}>Resolve</Button>
                <Button onClick={() => send('REJECT')}>Reject</Button>
            </div>
        </>
    )
}
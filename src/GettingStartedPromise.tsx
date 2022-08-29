import { useMachine } from '@xstate/react';
import { promiseMachine } from './machines/promise';

export const GettingStartedPromise = () => {
    const [state, send] = useMachine(promiseMachine);

    return (
        <>
            {/** One can listen to the state of the service */}
            { state.matches('pending') && <p>Loading</p> }
            { state.matches('rejected') && <p>Rejected</p> }
            { state.matches('resolved') && <p>Resolved</p> }
            <div>
                {/** One can send events to the running service */}
                <button onClick={() => send('RESOLVE')}>Resolve</button>
                <button onClick={() => send('REJECT')}>Reject</button>
            </div>
        </>
    )
}
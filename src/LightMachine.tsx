import { useMachine } from '@xstate/react';
import { lightMachine } from './machines/light-machine';

export const LightMachine = () => {
    const [state, send] = useMachine(lightMachine);

    return (
        <>
            <div>
                <p>
                    Trip the light fantastic!
                </p>
            </div>
        </>
    )
}

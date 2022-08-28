import promiseMachine from './promise';
import { D } from "@mobily/ts-belt";


test('canary test', () => {
    expect(2 + 2).toEqual(4);
});

describe('newly created promiseMachine', () => {
    it('has an id of "promise"', () => {
        expect(promiseMachine.id).toEqual('promise');
    });

    it('has an initial state of "pending"', () => {
        expect(promiseMachine.initial).toEqual('pending');
    });

    it('has three states: "pending", "resolved", "rejected"', () => {
        expect(D.keys(promiseMachine.states)).toEqual(['pending', 'resolved', 'rejected']);
    });
});

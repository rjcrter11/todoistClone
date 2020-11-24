import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { AddProject } from '../components/AddProject';



jest.mock('../context', () => ({
    useSelectedProjectValue: jest.fn(),
    useProjectsValue: jest.fn(() => ({
        projects: [
            {
                name: '🙌 THE OFFICE',
                projectId: '1',
                userId: 'jlIFXIwyAL3tzHMtzRbw',
                docId: 'michael-scott',
            },
            {
                name: '🚀 DAILY',
                projectId: '2',
                userId: 'jlIFXIwyAL3tzHMtzRbw',
                docId: 'daily-office',
            },
            {
                name: '🎯 FUTURE',
                projectId: '3',
                userId: 'jlIFXIwyAL3tzHMtzRbw',
                docId: 'wake-up',
            },
            {
                name: '📚 WORDS',
                projectId: '4',
                userId: 'jlIFXIwyAL3tzHMtzRbw',
                docId: 'arcade-fire',
            },
            {
                name: '🎵 MUSIC',
                projectId: '5',
                userId: 'jlIFXIwyAL3tzHMtzRbw',
                docId: 'bella-ciao',
            },
        ],
        setProjects: jest.fn(),
    })),
}));

jest.mock('../firebase', () => ({
    firebase: {
        firestore: jest.fn(() => ({
            collection: jest.fn(() => ({
                add: jest.fn(() => Promise.resolve('Resolved')),
            })),
        })),
    },
}));

beforeEach(cleanup);

describe('<AddProject />', () => {
    describe('Success', () => {
        it('renders <AddProject />', () => {
            const { queryByTestId } = render(<AddProject />);
            expect(queryByTestId('add-project')).toBeTruthy();
        });

        it('renders addProject and add a project using onClick', () => {
            const { queryByTestId } = render(<AddProject />);
            expect(queryByTestId('add-project')).toBeTruthy();

            fireEvent.change(queryByTestId('project-name', {
                target: { value: 'Some Project' },
            }));
            expect(queryByTestId('project-name').value).toBe('Some Project');
            fireEvent.click(queryByTestId('add-project-submit'));
        });
        it('hides the project overlay when cancelled onKeyDown', () => {
            const { queryByTestId, getByText } = render(<AddProject shouldShow />);
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeTruthy();

            fireEvent.keyDown(getByText('Cancel'), {
                key: 'a',
                code: 65,
            });
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeTruthy();

            fireEvent.keyDown(getByText('Cancel'), {
                key: 'Enter',
                code: 13,
            });
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeFalsy();
        });

        it('hides the project overlay using onClick singular and reverse action', () => {
            const { queryByTestId } = render(<AddProject shouldShow />);
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeTruthy();

            fireEvent.click(queryByTestId('add-project-action'));
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeFalsy();
        });

        it('hides the project overlay using onKeyDown singular and reverse action', () => {
            const { queryByTestId } = render(<AddProject shouldShow />);
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeTruthy();

            fireEvent.keyDown(queryByTestId('add-project-action'), {
                key: 'a',
                code: 65,
            });
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeTruthy();

            fireEvent.keyDown(queryByTestId('add-project-action'), {
                key: 'Enter',
                code: 13,
            });
            expect(queryByTestId('add-project')).toBeTruthy();
            expect(queryByTestId('add-project-inner')).toBeFalsy();
        });
    });
});
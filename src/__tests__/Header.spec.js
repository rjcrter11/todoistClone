import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Header } from '../components/layout/Header';
import { useSelectedProjectValue, useProjectsValue } from '../context';


jest.mock('../context', () => ({
    useSelectedProjectValue,
    useProjectsValue
}));

beforeEach(cleanup);

describe('<Header />', () => {
    describe('Success', () => {
        it('renders header component', () => {
            const { queryByTestId } = render(<Header />);
            expect(queryByTestId('header')).toBeTruthy();
        });

        it('renders header component and activates darkmode using onClick', () => {
            const darkMode = false
            const setDarkMode = jest.fn(() => !darkMode);
            const { queryByTestId } = render(<Header darkMode={darkMode} setDarkMode={setDarkMode} />
            );
            expect(queryByTestId('header')).toBeTruthy();

            fireEvent.click(queryByTestId('dark-mode-action'));
            expect(setDarkMode).toHaveBeenCalledWith(true)
        });

        it('renders header component and sets quick add task to true onClick', () => {
            const darkMode = false;
            const { queryByTestId } = render(<Header darkMode={darkMode} />
            );
            expect(queryByTestId('header')).toBeTruthy();

            fireEvent.click(queryByTestId('quick-add-task-action'));
            expect(queryByTestId('add-task-main')).toBeTruthy()
        });

    });
});


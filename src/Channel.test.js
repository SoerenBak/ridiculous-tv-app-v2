import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import Channel from './components/Channel';
import {BrowserRouter as Router} from "react-router-dom";


it('renders App with header text', () => {
    const comp =
        <Router>
            <Channel channels={channelsTestData} categories={categoriesTestData} programs={programsTestData}/>
        </Router>;
    const {getByText} = render(comp);
    expect(getByText("DR1")).toBeInTheDocument();
    expect(getByText("DR2")).toBeInTheDocument();
    expect(getByText("TV2")).toBeInTheDocument();

});
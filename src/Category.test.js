import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import Category from './components/Category';
import {BrowserRouter as Router} from "react-router-dom";


it('renders App with header text', () => {
    const comp =
        <Router>
            <Category categories={categoriesTestData} programs={programsTestData}/>
        </Router>;
    const {getByText} = render(comp);
    expect(getByText("News")).toBeInTheDocument();
    expect(getByText("Sport")).toBeInTheDocument();
    expect(getByText("Movies")).toBeInTheDocument();

});
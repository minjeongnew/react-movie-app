import React from 'react';
import './MovieTemplate.scss';

const MovieTemplate = ({ children }) => {
    return (
        <div className="MovieTemplate">
            <div className="app-title">영화 검색 서비스</div>
            <div className="content">{children}</div>
        </div>
    );
};

export default MovieTemplate;

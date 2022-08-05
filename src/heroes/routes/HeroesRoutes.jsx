import React, { useContext } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Navbar } from '../../ui';
import { DCPage, HeroPage, MarvelPage, SearchPage } from '../';
import { AuthContext } from '../../auth/context';

export const HeroesRoutes = () => {

    return (
        <>
            <Navbar />

            <div className="container">
                <Routes>
                    <Route path='marvel' element={<MarvelPage />} />
                    <Route path='dc' element={<DCPage />} />
                    <Route path='search' element={<SearchPage />} />
                    <Route path='hero/:heroId' element={<HeroPage />} />

                    <Route path='/' element={<Navigate to={'marvel'} />} />
                </Routes>
            </div>
        </>
    )
}

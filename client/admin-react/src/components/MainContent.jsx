//region imports
import React from 'react'
//endregion

//region MainContent component
/**
 * MainContent component for rendering main page content
 * Props:
 * - children: content to display
 */
const MainContent = ({children}) => (
    <main className="flex-1 overflow-auto h-screen">
        {children}
    </main>
)
//endregion

export default MainContent;

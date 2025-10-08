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
    <main className="flex-1 overflow-auto">
        <div className="min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 bg-slate-700">{children}</div>
    </main>
)
//endregion

export default MainContent;

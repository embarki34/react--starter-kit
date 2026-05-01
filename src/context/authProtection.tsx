// import React, { useEffect, useState } from "react"
// import { Navigate, useLocation } from "react-router-dom"
// import useAuthStore from "@/lib/stor"

// interface ProtectedRouteProps {
//     children: React.ReactNode
//     allowedRoles?: string[]
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
//     const { isAuthenticated, isRefreshing, user, token } = useAuthStore()
//     const [checked, setChecked] = useState(false)
//     const [hasRehydrated, setHasRehydrated] = useState(false)
//     const location = useLocation();

//     useEffect(() => {
//         // Wait for Zustand persist middleware to rehydrate from localStorage
//         // This is crucial for OAuth flows where the token is set just before navigation
//         const timeout = setTimeout(() => {
//             setHasRehydrated(true)
//         }, 50)
//         return () => clearTimeout(timeout)
//     }, [])

//     useEffect(() => {
//         // Wait until we know whether a refresh is happening or not, and rehydration is done
//         if (!isRefreshing && hasRehydrated) {
//             setChecked(true)
//         }
//     }, [isRefreshing, hasRehydrated])

//     // While checking or refreshing, render nothing (or a loader)
//     if (!checked || isRefreshing) {
//         // return null
//         // Optionally:
//         return <div className="flex justify-center items-center h-screen">Checking session...</div>
//     }

//     // If not authenticated and not refreshing, redirect to login
//     if (!isAuthenticated) {
//         return <Navigate to="/login" replace state={{ from: location }} />
//     }

//     if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
//         // Redirect based on role if trying to access unauthorized area
//         if (user.role === 'KITCHEN') {
//             return <Navigate to="/dashboard/kitchen" replace />
//         }
//         if (user.role === 'DRIVER') {
//             // Driver shouldn't be here, maybe show a "Use App" page or log them out
//             return <div className="flex flex-col items-center justify-center h-screen">
//                 <h1 className="text-2xl font-bold">Driver Access</h1>
//                 <p>Please use the mobile application.</p>
//             </div>
//         }
//         // Fallback for staff/admin accessing kitchen only pages (if any)
//         // or just general unauthorized
//         return <Navigate to="/dashboard" replace />
//     }

//     // Otherwise render the protected content
//     return <>{children}</>
// }

// export default ProtectedRoute
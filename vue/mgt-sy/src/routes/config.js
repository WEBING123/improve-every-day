export default {
    routes: [
        {
            path: "/",
            name: "Home",
            component: ()=>import("@/views/Home"),
        },
        // {
        //     path: "/login",
        //     name: "Login",
        //     component: ()=>import("@/views/Login"),
        // },
        // {
        //     path: "/reg",
        //     name: "Reg",
        //     component: ()=>import("@/views/Reg"),
        // },
        // 动态路由（路由中的路径是可以动态改变的）
        // {
        //     path: "/channel/:id",
        //     name: "ChannelNews",
        //     component: ()=>import("@/views/ChannelNews"),
        // },
        // 若在之前没有匹配到路径，则
        // 匹配所有路径（默认）
        // {
        //     path: "*",
        //     name: "404",
        //     component: ()=>import("@/views/NotFound"),
        // }
    ],
    mode: "history",
}
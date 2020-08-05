import * as React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Sidebar } from 'react-admin';
import AppBar from './AppBar';
import Menu from './Menu';
import { darkTheme, lightTheme } from './themes';
import { AppState } from '../types';
import { makeStyles } from '@material-ui/core';

const CustomSidebar = (props: any) => <Sidebar {...props} size={200} />;

const useSidebarStyles = makeStyles({
    drawerPaper: {
    },
});

const MySidebar = (props:any) => {
    const classes = useSidebarStyles();
    return (
        <Sidebar classes={classes} {...props} />
    );
};

export default (props: any) => {
    const theme = useSelector((state: AppState) =>
        state.theme === 'dark' ? darkTheme : lightTheme
    );
    return (
        <Layout
            {...props}
            appBar={AppBar}
            sidebar={MySidebar}
            menu={Menu}
            theme={theme}
        />
    );
};

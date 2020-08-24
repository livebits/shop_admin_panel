import * as React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Sidebar, useLocale } from 'react-admin';
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
    const locale = useLocale();
    const dir = locale === 'fa' ? 'rtl' : 'ltr';
    const theme = useSelector((state: AppState) => {        
        return state.theme === 'dark' ? darkTheme(dir) : lightTheme(dir)
    }
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

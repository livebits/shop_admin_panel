export const darkTheme = (dir:string) => ({
    direction: dir,
    palette: {
        primary: {
            main: '#90caf9',
        },
        secondary: {
            light: '#eeeeee',
            main: '#eeeeee',
            dark: '#eeeeee',
            contrastText: '#333333',
        },
        type: 'dark', // Switching the dark mode on is a single property value change.
    },
    typography: {
        fontFamily: [
            'IRANSans',
            'Arial',
            '"Segoe UI"',
            'sans-serif',
        ].join(','),
    },
});

export const lightTheme = (dir:string) => ({
    direction: dir,
    palette: {
        primary: {
            main: '#ed5936bf',
        },
        secondary: {
            light: '#5f5fc4',
            main: '#283593',
            dark: '#001064',
            contrastText: '#fff',
        },
        background: {
            default: '#fcfcfe',
        },
    },
    shape: {
        borderRadius: 10,
    },
    typography: {
        fontFamily: [
            'IRANSans',
            'Arial',
            '"Segoe UI"',
            'sans-serif',
        ].join(','),
    },
    overrides: {
        RaMenuItemLink: {
            root: {
                borderLeft: '3px solid #fff',
            },
            active: {
                borderLeft: '3px solid #ed5936bf',
                // background: '#4f3cc945',
                // borderRadius: '0px 5px 5px 0px',
            },
        
        },
        MuiPaper: {
            elevation1: {
                boxShadow: 'none',
            },
            root: {
                border: '1px solid #e0e0e3',
                backgroundClip: 'padding-box',
            },
        },
        MuiButton: {
            contained: {
                backgroundColor: '#fff',
                color: '#4f3cc9',
                boxShadow: 'none',
            },
        },
        MuiAppBar: {
            colorSecondary: {
                color: '#ffffff',
                backgroundColor: '#373e48',
            },
        },
        MuiLinearProgress: {
            colorPrimary: {
                backgroundColor: '#f5f5f5',
            },
            barColorPrimary: {
                backgroundColor: '#d7d7d7',
            },
        },
        MuiFilledInput: {
            root: {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                '&$disabled': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
            },
        },
        MuiListItemIcon: {
            root: {
                color: '#ed5936bf',
            }
        },
        // MuiSvgIcon: {
        //     root: {
        //         color: '#ed5936bf',
        //     }
        // }
    },
});

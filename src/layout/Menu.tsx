import * as React from 'react';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import SettingsIcon from '@material-ui/icons/Settings';
import LabelIcon from '@material-ui/icons/Label';
import { useMediaQuery, Theme } from '@material-ui/core';
import { useTranslate, DashboardMenuItem, MenuItemLink } from 'react-admin';

import SubMenu from './SubMenu';
import { AppState } from '../types';
import { getResources } from 'react-admin';
import DefaultIcon from '@material-ui/icons/ViewList';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import MessageRoundedIcon from '@material-ui/icons/MessageRounded';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import HomeWorkRoundedIcon from '@material-ui/icons/HomeWorkRounded';
import ViewCarouselRoundedIcon from '@material-ui/icons/ViewCarouselRounded';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import AppsRoundedIcon from '@material-ui/icons/AppsRounded';
import CardGiftcardRoundedIcon from '@material-ui/icons/CardGiftcardRounded';
import ExtensionRoundedIcon from '@material-ui/icons/ExtensionRounded';
import AnnouncementRoundedIcon from '@material-ui/icons/AnnouncementRounded';
import PermIdentityRoundedIcon from '@material-ui/icons/PermIdentityRounded';
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';
import LocalAtmRoundedIcon from '@material-ui/icons/LocalAtmRounded';

type MenuName = 'menuManagers' | 'menuCustomers' | 'menuTenants' | 'menuRoles' | 'menuFinancials' | 'menuPermissions' | 'menuBrands' | 'menuBanners' | 'menuCategories' | 'menuDepartments' | 'menuDiscounts' | 'menuMessages' | 'menuTickets' | 'menuProducts' | 'menuProductComments' | 'menuOrders';

interface Props {
    dense: boolean;
    logout: () => void;
    onMenuClick: () => void;
}

const Menu: FC<Props> = ({ onMenuClick, dense, logout }) => {
    const [state, setState] = useState({
        menuManagers: false,
        menuCustomers: false,
        menuTenants: false,
        menuFinancials: false,
        menuRoles: false,
        menuPermissions: false,
        menuBrands: false,
        menuBanners: false,
        menuCategories: false,
        menuDepartments: false,
        menuDiscounts: false,
        menuMessages: false,
        menuProducts: false,
        menuProductComments: false,
        menuOrders: false,
        menuTickets: false,
    });
    const resources:any = useSelector(getResources);
    const translate = useTranslate();
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('xs')
    );
    const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
    useSelector((state: AppState) => state.theme); // force rerender on theme change

    const handleToggle = (menu: MenuName) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <div>
            {' '}
            <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
            <SubMenu
                handleToggle={() => handleToggle('menuManagers')}
                isOpen={state.menuManagers}
                sidebarIsOpen={open}
                name="pos.menu.managers"
                icon={<PeopleAltRoundedIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/managers`}
                    primaryText={translate(`resources.managers.name`, { smart_count: 10 })}
                    leftIcon={<PeopleAltRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/managers/create`}
                    primaryText={translate(`ra.action.create`)}
                    leftIcon={<PersonAddRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuCustomers')}
                isOpen={state.menuCustomers}
                sidebarIsOpen={open}
                name="pos.menu.customers"
                icon={<PermIdentityRoundedIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/customers`}
                    primaryText={translate(`resources.customers.name`, { smart_count: 10 })}
                    leftIcon={<PermIdentityRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/customers/create`}
                    primaryText={translate(`ra.action.create`)}
                    leftIcon={<PersonAddRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuTenants')}
                isOpen={state.menuTenants}
                sidebarIsOpen={open}
                name="pos.menu.tenants"
                icon={<AccountBalanceRoundedIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/tenants`}
                    primaryText={translate(`resources.tenants.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<AccountBalanceRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/tenants/create`}
                    primaryText={translate(`ra.action.create`)}
                    leftIcon={<AddCircleRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuRoles')}
                isOpen={state.menuRoles}
                sidebarIsOpen={open}
                name="pos.menu.roles"
                icon={<VerifiedUserRoundedIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/roles`}
                    primaryText={translate(`resources.roles.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<VerifiedUserRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/roles/create`}
                    primaryText={translate(`ra.action.create`)}
                    leftIcon={<AddCircleRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuPermissions')}
                isOpen={state.menuPermissions}
                sidebarIsOpen={open}
                name="pos.menu.permissions"
                icon={<LockRoundedIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/permissions`}
                    primaryText={translate(`resources.permissions.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<LockRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/permissions/create`}
                    primaryText={translate(`ra.action.create`)}
                    leftIcon={<AddCircleRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuDepartments')}
                isOpen={state.menuDepartments}
                sidebarIsOpen={open}
                name="pos.menu.departments"
                icon={<HomeWorkRoundedIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/departments`}
                    primaryText={translate(`resources.departments.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<HomeWorkRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/departments/create`}
                    primaryText={translate(`ra.action.create`)}
                    leftIcon={<AddCircleRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuDiscounts')}
                isOpen={state.menuDiscounts}
                sidebarIsOpen={open}
                name="pos.menu.discounts"
                icon={<CardGiftcardRoundedIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/discounts`}
                    primaryText={translate(`resources.discounts.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<CardGiftcardRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/discounts/create`}
                    primaryText={translate(`ra.action.create`)}
                    leftIcon={<AddCircleRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            
            <SubMenu
                handleToggle={() => handleToggle('menuBrands')}
                isOpen={state.menuBrands}
                sidebarIsOpen={open}
                name="pos.menu.brands"
                icon={<ExtensionRoundedIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/brands`}
                    primaryText={translate(`resources.brands.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<ExtensionRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/brands/create`}
                    primaryText={translate(`ra.action.create`)}
                    leftIcon={<AddCircleRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuBanners')}
                isOpen={state.menuBanners}
                sidebarIsOpen={open}
                name="pos.menu.banners"
                icon={<ViewCarouselRoundedIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/banners`}
                    primaryText={translate(`resources.banners.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<ViewCarouselRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/banners/create`}
                    primaryText={translate(`ra.action.create`)}
                    leftIcon={<AddCircleRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuCategories')}
                isOpen={state.menuCategories}
                sidebarIsOpen={open}
                name="pos.menu.categories"
                icon={<CategoryRoundedIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/categories`}
                    primaryText={translate(`resources.categories.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<CategoryRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/categories/create`}
                    primaryText={translate(`ra.action.create`)}
                    leftIcon={<AddCircleRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuMessages')}
                isOpen={state.menuMessages}
                sidebarIsOpen={open}
                name="pos.menu.messages"
                icon={<MailOutlineRoundedIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/messages`}
                    primaryText={translate(`resources.messages.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<MailOutlineRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/messages/create`}
                    primaryText={translate(`ra.action.create`)}
                    leftIcon={<AddCircleRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuProducts')}
                isOpen={state.menuProducts}
                sidebarIsOpen={open}
                name="pos.menu.products"
                icon={<AppsRoundedIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/products`}
                    primaryText={translate(`resources.products.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<AppsRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/products/create`}
                    primaryText={translate(`ra.action.create`)}
                    leftIcon={<AddCircleRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <MenuItemLink
                to={`/orders`}
                primaryText={translate(`resources.orders.name`, {
                    smart_count: 2,
                })}
                leftIcon={<ShoppingCartRoundedIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
            <SubMenu
                handleToggle={() => handleToggle('menuFinancials')}
                isOpen={state.menuFinancials}
                sidebarIsOpen={open}
                name="pos.menu.financials"
                icon={<MonetizationOnRoundedIcon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/transactions`}
                    primaryText={translate(`resources.transactions.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<MonetizationOnRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/transactions/create`}
                    primaryText={translate(`resources.transactions.page.add`)}
                    leftIcon={<AddCircleRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/online-payments`}
                    primaryText={translate(`resources.online-payments.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<LocalAtmRoundedIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <MenuItemLink
                to={`/comments`}
                primaryText={translate(`resources.comments.name`, {
                    smart_count: 2,
                })}
                leftIcon={<MessageRoundedIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
            <MenuItemLink
                to={`/tickets`}
                primaryText={translate(`resources.tickets.name`, {
                    smart_count: 2,
                })}
                leftIcon={<AnnouncementRoundedIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
            {isXSmall && (
                <MenuItemLink
                    to="/configuration"
                    primaryText={translate('pos.configuration')}
                    leftIcon={<SettingsIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            )}
            {isXSmall && logout}
        </div>
    );
};

export default Menu;

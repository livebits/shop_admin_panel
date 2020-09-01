import { TranslationMessages } from 'ra-core';
import farsiMessages from './farsiMessages';

const customFarsiMessages: TranslationMessages = {
    ...farsiMessages,
    pos: {
        appName: 'فروشگاه نوین تک',
        search: 'جستجو',
        configuration: 'تنظیمات',
        language: 'زبان',
        theme: {
            name: 'تم',
            light: 'روز',
            dark: 'شب',
        },
        dashboard: {
            monthly_revenue: 'درآمد ماهیانه',
            month_history: 'درآمد 30 روز اخیر ',
            new_orders: 'سفارشات جدید',
            pending_reviews: 'نظرات بررسی نشده',
            new_customers: 'مشتریان جدید',
            pending_orders: 'سفارشات بررسی نشده',
            order: {
                items:
                    'by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items',
            },
            welcome: {
                title: 'پنل مدیریتی فروشگاه نوین تک',
                subtitle:
                    "در این قسمت آخرین اعلان ها نمایش داده خواهد شد.",
            },
        },
        menu: {
            managers: 'مدیران',
            customers: 'مشتریان',
            tenants: 'شرکت ها',
            roles: 'نقش ها',
            permissions: 'مجوزات',
            brands: 'برندها',
            categories: 'دسته بندی ها',
            departments: 'واحدها',
            discounts: 'تخفیفات',
            messages: 'پیام ها',
            products: 'محصولات',
            productComments: 'نظرات',
            orders: 'سفارشات',
        },
        status: {
            active: 'فعال',
            inactive: 'غیرفعال',
        },
        dataType: {
            number: 'عددی',
            string: 'متنی',
            text: 'رشته ای',
            date: 'تاریخ',
            option: 'انتخابی',
        },
        discountType: {
            percent: 'درصدی',
            constant: 'ثابت',
        },
        messageType: {
            sms: 'پیامک',
            notification: 'اعلان',
        },
        receiverType: {
            single_user: 'کاربرخاص',
            all_users: 'همه کاربران',
        },
        orderStatus: {
            delivered: 'تحویل داده شده',
            pending: 'بررسی نشده',
            accepted: 'تایید سفارش',
            ready_to_send: 'آماده ارسال',
            posted: 'ارسال شده',
            cancelled: 'کنسل شده',
            unknown: 'نامشخص',
        },
        productStatus: {
            available: 'موجود',
            not_available: 'ناموجود',
        },
        permissionStatus: {
            allow: 'مجاز',
            deny: 'غیرمجاز',
        },
        tenantStatus: {
            active: 'فعال',
            inactive: 'غیرفعال',
            pending_confirmation: 'در حال بررسی',
            expired: 'منقضی شده',
        },
        ticketStatus: {
            pending: 'بررسی نشده',
            checked: 'برسی شده',
        },
        error: {
            aclError: 'دسترسی غیر مجاز',
        }
    },
    resources: {
        customers: {
            name: 'مشتری |||| مشتریان',
            fields: {
                id: 'کد',
                createdAt: 'تاریخ ثبت نام',
                firstName: 'نام',
                lastName: 'نام خانوادگی',
                username: 'نام کاربری',
                email: 'ایمیل',
                status: 'وضعیت',
                password: 'رمزعبور',
                newPassword: ' رمزعبور جدید',
                avatar: 'تصویر کاربر',
                lastLogin: 'آخرین ورود',
            },
            filters: {
            },
            page: {
                delete: 'حذف مشتری',
                add: 'ثبت مشتری جدید',
                edit: '%{customer_name} ویرایش',
                addAddress: 'ثبت آدرس جدید',
                editAddress: 'ویرایش آدرس',
                savedAddresses: 'آدرس های ثبت شده',
                changePassword: 'تغییر رمزعبور',
            },
            errors: {
                password_mismatch:
                'رمزعبور و تکرار یکی نیستند.',
            },
            tabs: {
                addresses: 'آدرس های کاربر',
                publicInfo: 'اطلاعات عمومی',
            }
        },
        managers: {
            name: 'مدیر |||| مدیران',
            fields: {
                id: 'کد',
                createdAt: 'تاریخ ثبت نام',
                firstName: 'نام',
                lastName: 'نام خانوادگی',
                username: 'نام کاربری',
                email: 'ایمیل',
                status: 'وضعیت',
                password: 'رمزعبور',
                avatar: 'تصویر کاربر',
                lastLogin: 'آخرین ورود',
                roles: 'نقش ها',
                newPassword: ' رمزعبور جدید',
            },
            filters: {
            },
            page: {
                delete: 'حذف مدیر',
                add: 'ثبت مدیر جدید',
            },
            errors: {
                password_mismatch:
                'رمزعبور و تکرار یکی نیستند.',
            },
        },
        permissions: {
            name: 'مجوز |||| مجوزها',
            fields: {
                id: 'کد',
                resource: 'منو',
                action: 'عملیات',
                description: 'توضیحات',
            },
            filters: {
            },
            page: {
            },
            errors: {
            },
        },
        brands: {
            name: 'برند |||| برندها',
            fields: {
                id: 'کد',
                name: 'نام',
                logo: 'تصویر برند',
                description: 'توضیحات',
            },
            filters: {
            },
            page: {
            },
            errors: {
            },
        },
        tickets: {
            name: 'تیکت |||| تیکت ها',
            fields: {
                id: 'کد',
                title: 'موضوع',
                body: 'متن تیکت',
                status: 'وضعیت',
                attachments: 'فایل های ضمیمه',
                customer: 'کاربر ثبت کننده',
                department: 'دپارتمان',
                operator: 'اپراتور',
            },
            filters: {
            },
            page: {
            },
            errors: {
            },
        },
        discounts: {
            name: 'تخفیف |||| تخفیف ها',
            fields: {
                id: 'کد',
                type: 'نوع تخفیف',
                code: 'کد',
                value: 'مقدار',
            },
            filters: {
            },
            page: {
            },
            errors: {
            },
        },
        messages: {
            name: 'پیام |||| پیام ها',
            fields: {
                id: 'کد',
                createdAt: 'تاریخ ثبت',
                title: 'عنوان',
                body: 'متن پیام',
                type: 'نوع پیام',
                expiredAt: 'تاریخ انقضا',
                receivers: 'دریافت کنندگان',
                receiver: 'دریافت کننده',
                receiversType: 'نوع دریافت کننده',
                receiverId: ' دریافت کننده',
            },
            filters: {
            },
            page: {
            },
            errors: {
            },
        },
        'user-addresses': {
            name: 'آدرس مشتری |||| آدرس های مشتری',
            fields: {
                id: 'کد',
                name: 'عنوان آدرس',
                address: 'آدرس',
                mobile: 'موبایل',
                phone: 'تلفن',
                city: 'شهر',
                state: 'استان',
                pelak: 'پلاک',
                unit: 'واحد',
                zip: 'کدپستی',
                receiver: 'دریافت کننده',
            },
        },
        categories: {
            name: 'دسته بندی |||| دسته بندی ها',
            fields: {
                id: 'کد',
                name: 'نام',
                avatar: 'تصویر دسته بندی',
                description: 'توضیحات',
                parentId: 'والد',
                categoryFields: 'فیلدهای دسته بندی',
                products: 'محصولات',
                priority: 'اولویت',
                hint: 'راهنما',
                dataType: 'نوع فیلد',
                defaultValue: 'مقدار پیشفرض',
                isRequired: 'اجباری؟',
                min: 'حداقل',
                max: 'حداکثر',
                showInFilter: 'نمایش در فیلتر',
                options: 'گزینه ها (در هر سطر یک مورد وارد کنید)',
            },
            filters: {
            },
            page: {
            },
            errors: {
            },
        },
        categoryFields: {
            name: 'فیلد دسته بندی |||| فیلدهای دسته بندی',
            fields: {
                id: 'کد',
                name: 'نام',
                priority: 'اولویت',
                hint: 'راهنما',
                dataType: 'نوع فیلد',
                defaultValue: 'مقدار پیشفرض',
                isRequired: 'اجباری؟',
            },
        },
        departments: {
            name: 'واحد |||| واحدها',
            fields: {
                id: 'کد',
                name: 'نام',
                logo: 'لوگو',
                description: 'توضیحات',
            },
            filters: {
            },
            page: {
            },
            errors: {
            },
        },
        orders: {
            name: 'سفارش |||| سفارشات',
            amount: '۱ سفارش |||| %{smart_count} سفارش',
            title: 'سفارش %{id}',
            fields: {
                createdAt: 'تاریخ ثبت',
                id: 'شماره سفارش',
                customer: 'مشتری',
                factor :{
                    orderPrice: 'مبلغ',
                    productName: 'کالا',
                    unitPrice: 'قیمت',
                    quantity: 'تعداد',
                    sum: 'جمع',
                    productsPrice: 'مبلغ کل کالاها',
                    discountPrice: 'تخفیف',
                    deliveryPrice: 'هزینه ارسال',
                    total: 'جمع',
                },
                basketCount: 'تعداد سبد خرید',
                shipmentType: 'نحوه ارسال',
                returned: 'برگشت خورده؟',
                customerId: 'مشتری',
                status: 'وضعیت',
            },
            filters: {
                id: 'شماره سفارش',
                customer: 'کاربر',
                returned: 'برگشت خورده؟',
                minDate: 'از تاریخ',
                maxDate: 'تا تاریخ',
                minPrice: 'حداقل قیمت',
                maxPrice: 'حداکثر قیمت',
            },
            tabs: {
                ordered: 'بررسی نشده',
                posted: 'ارسال شده',
                delivered: 'تحویل شده',
                cancelled: 'کنسل شده',
            },
        },
        roles: {
            name: 'نقش |||| نقش ها',
            fields: {
                id: 'کد',
                createdAt: 'تاریخ ثبت',
                name: 'نام',
                rolePermissions: 'دسترسی ها',
                permissionId: 'دسترسی',
                status: 'وضعیت',
            },
            filters: {
            },
            page: {
            },
            errors: {
            },
        },
        rolePermissions: {
            name: 'نقش |||| نقش ها',
            fields: {
                permissionId: 'دسترسی',
                status: 'وضعیت',
            },
        },
        tenants: {
            name: 'شرکت |||| شرکت ها',
            fields: {
                id: 'کد',
                createdAt: 'تاریخ ثبت',
                name: 'نام',
                description: 'توضیحات',
                phone: 'تلفن',
                mobile: 'موبایل',
                logo: 'لوگو',
                status: 'وضعیت',
                type: 'نوع',
                address: 'آدرس',
                country: 'کشور',
                city: 'شهر',
                state: 'استان',
                zip: 'کد پستی',
            },
        },
        invoices: {
            name: 'Invoice |||| Invoices',
            fields: {
                date: 'Invoice date',
                customer_id: 'Customer',
                command_id: 'Order',
                date_gte: 'Passed Since',
                date_lte: 'Passed Before',
                total_gte: 'Min amount',
                address: 'Address',
            },
        },
        products: {
            name: 'کالا |||| کالاها',
            fields: {
                categoryId: 'دسته بندی',
                name: 'نام',
                secondName: 'نام دوم',
                thumbnail: 'عکس',
                status: 'وضعیت',
                brandId: 'برند',
                description: 'توضیحات',
                pros: 'مزایا',
                cons: 'معایب',
                productFields: 'فیلدهای کالا',
                prices: 'قیمت های کالا',
                attachments: 'تصاویر',
                analysis: 'توضیحات فنی',
                prosValue: 'عنوان مزیت',
                consValue: 'عنوان عیب',
                fieldKey: 'عنوان',
                fieldValue: 'مقدار',
                guarantee: 'گارانتی',
                priceFields: {
                    name: 'نام',
                    color: 'رنگ',
                    quantity: 'تعداد',
                    price: 'قیمت',
                    status: 'وضعیت کالا',
                    offPercent: 'درصد تخفیف',
                    offPrice: 'قیمت با تخفیف',
                }
            },
            filters: {
                category: 'دسته بندی',
                brand: 'برند',
                status: 'وضعیت',
                minPrice: 'حداقل قیمت',
                maxPrice: 'حداکثر قیمت',
            },
            tabs: {
                public: 'مشخصات عمومی',
                description: 'توضیحات',
                proscons: 'مزایا/معایب',
                productFields: 'فیلدهای اختصاصی',
                category: 'دسته بندی',
                prices: 'قیمت ها',
                other: 'سایر',
            },
        },
        'comments': {
            name: 'نظر |||| نظرات کاربران',
            amount: '1 نظر |||| %{smart_count} نظر',
            relative_to_poster: 'Review on poster',
            detail: 'جزییات نظر',
            fields: {
                createdAt: 'تاریخ ثبت',
                customer: 'کاربر',
                product: 'کالا',
                rate: 'امتیاز',
                comment: 'نظر',
                status: 'وضعیت',
            },
            filters: {
                status: 'وضعیت',
                customer: 'کاربر',
                product: 'کالا',
            },
            action: {
                accept: 'تایید',
                reject: 'رد',
            },
            notification: {
                approved_success: 'نظر تایید شد',
                approved_error: 'Error: نظر تایید نشد',
                rejected_success: 'نظر رد شد',
                rejected_error: 'Error: نظر رد نشد',
            },
            status: {
                pending: 'بررسی نشده',
                approved: 'تایید شده',
                rejected: 'رد شده',
            }
        },
        segments: {
            name: 'Segment |||| Segments',
            fields: {
                customers: 'Customers',
                name: 'Name',
            },
            data: {
                compulsive: 'Compulsive',
                collector: 'Collector',
                ordered_once: 'Ordered once',
                regular: 'Regular',
                returns: 'Returns',
                reviewer: 'Reviewer',
            },
        },
    },
    error: {
        user: {
            'Not Found': 'موردی پیدا نشد',
            'Forbidden': 'شما دسترسی های لازم را ندارید',
        },
        unique: {
            email: 'ایمیل تکراری می باشد',
            username: 'نام کاربری تکراری می باشد',
        },
    }
};

export default customFarsiMessages;

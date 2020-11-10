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
            banners: 'بنرها',
            categories: 'دسته بندی ها',
            departments: 'واحدها',
            discounts: 'تخفیفات',
            messages: 'پیام ها',
            products: 'محصولات',
            productComments: 'نظرات',
            orders: 'سفارشات',
            financials: 'مالی',
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
        orderLogStatus: {
            delivered: 'تحویل به مشتری',
            pending: 'ثبت سفارش',
            accepted: 'تایید سفارش',
            ready_to_send: 'آماده برای ارسال',
            posted: 'ارسال برای مشتری',
            cancelled: 'کنسل شدن سفارش',
            unknown: 'نامشخص',
        },
        productStatus: {
            available: 'موجود',
            not_available: 'ناموجود',
        },
        orderShipmentType: {
            express: 'پست ویژه',
            custom_post: 'پست سفارشی',
            courier: 'پیک',
            alopeik: 'الوپیک',
            tipax: 'تیپاکس',
        },
        orderPaymentType: {
            online: 'آنلاین',
            cash: 'نقدی',
            card: 'کارت به کارت',
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
        transactionType: {
            increase_credit: 'افزایش حساب',
            decrease_credit: 'برداشت از حساب',
        },
        transactionReason: {
            order: 'سفارش',
            charge: 'شارژ کیف پول',
        },
        paymentStatus: {
            paid: 'پرداخت شده',
            not_paid: 'پرداخت نشده',
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
                mobile: 'موبایل',
                email: 'ایمیل',
                status: 'وضعیت',
                credit: 'اعتبار',
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
        transactions: {
            name: 'تراکنش |||| تراکنش ها',
            fields: {
                id: 'کد',
                createdAt: 'تاریخ ثبت',
                customerId: 'مشتری',
                customer: 'مشتری',
                price: 'مقدار تراکنش',
                type: 'نوع تراکنش',
                reason: 'دلیل تراکنش',
                relatedId: 'سفارش',
                description: 'توضیحات',
            },
            filters: {
            },
            page: {
                delete: 'حذف تراکنش',
                add: 'ثبت تراکنش',
            },
            errors: {},
        },
        'online-payments': {
            name: 'پرداخت |||| پرداخت ها',
            fields: {
                id: 'کد',
                createdAt: 'تاریخ ثبت',
                createdBy: 'نام کاربر',
                amount: 'مقدار',
                status: 'وضعیت',
                gatewayStatus: 'پاسخ درگاه',
                refNum: 'کد ارجاع',
                resNum: '',
                terminalId: '',
                traceNo: '',
                cartNo: 'شماره کارت',
            },
            filters: {
            },
            page: {
                delete: 'حذف پرداختی',
                add: 'ثبت پرداختی',
            },
            errors: {},
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
        banners: {
            name: 'بنر |||| بنرها',
            fields: {
                id: 'کد',
                link: 'لینک',
                priority: 'اولویت',
                description: 'توضیحات',
                filename: 'تصویر',
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
        'product-offers': {
            name: 'محصول ویژه |||| محصولات ویژه',
            add: 'ثبت محصول ویژه',
            fields: {
                id: 'کد',
                createdAt: 'تاریخ ثبت',
                expireAt: 'تاریخ انقضا',
                productId: 'کالا',
                product: 'کالا',
                productPriceId: 'رنگ (قیمت)',
                productPrice: 'رنگ (قیمت)',
                discountPercent: 'درصد تخفیف',
                discountPrice: 'مبلغ با تخفیف',
                totalQuantity: 'تعداد کل',
                remainQuantity: 'تعداد باقی مانده',
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
                showInFilter: 'نمایش در فیلتر؟',
                isProperty: 'نمایش در ویژگی ها؟',
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
                    status: 'وضعیت پرداخت',
                    sum: 'جمع',
                    productsPrice: 'مبلغ کل کالاها',
                    discountPrice: 'تخفیف',
                    deliveryPrice: 'هزینه ارسال',
                    total: 'جمع',
                },
                basketCount: 'تعداد سبد خرید',
                shipmentType: 'نحوه ارسال',
                paymentType: 'نحوه پرداخت',
                returned: 'برگشت خورده؟',
                customerId: 'مشتری',
                status: 'وضعیت',
                description: 'توضیحات',
                doneDate: 'زمان انجام',
                action: 'عملیات',
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
                ordered: 'در حال بررسی',
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
                caption: 'عنوان',
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
        comments: {
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
    notification: {
        user_address_deleted: 'آدرس کاربر حذف شد',
        user_address_not_deleted: 'حذف آدرس کاربر با مشکل مواجه شد',
        user_image_deleted: 'تصویر کاربر حذف شد',
        user_image_not_deleted: 'حذف تصویر کاربر با مشکل مواجه شد',
        user_image_updated: 'تصویر کاربر بروزرسانی شد',
        user_image_not_updated: 'بروزرسانی تصویر کاربر با مشکل مواجه شد',
        user_password_changed: 'رمزعبور کاربر بروزرسانی شد',
        user_password_not_changed: 'بروزرسانی رمزعبور کاربر با مشکل مواجه شد',
        banner_image_deleted: 'تصویر بنر حذف شد',
        banner_image_not_deleted: 'حذف تصویر بنر با مشکل مواجه شد',
        banner_image_updated: 'تصویر بنر با موفقیت بروزرسانی شد',
        banner_image_not_updated: 'بروزرسانی تصویر بنر با مشکل مواجه شد',
        cat_image_deleted: 'تصویر دسته بندی حذف شد',
        cat_image_not_deleted: 'حذف تصویر دسته بندی با مشکل مواجه شد',
        cat_image_updated: 'تصویر دسته بندی با موفقیت بروزرسانی شد',
        cat_image_not_updated: 'بروزرسانی تصویر دسته بندی با مشکل مواجه شد',
        user_address_updated: 'آدرس کاربر با موفقیت بروزرسانی شد',
        user_address_not_updated: 'بروزرسانی آدرس کاربر با مشکل مواجه شد',
        dep_image_deleted: 'تصویر دپارتمان حذف شد',
        dep_image_not_deleted: 'حذف تصویر دپارتمان با مشکل مواجه شد',
        dep_image_updated: 'تصویر دپارتمان با موفقیت بروزرسانی شد',
        dep_image_not_updated: 'بروزرسانی تصویر دپارتمان با مشکل مواجه شد',
        product_image_deleted: 'تصویر کالا حذف شد',
        product_image_not_deleted: 'حذف تصویر کالا با مشکل مواجه شد',
        product_image_updated: 'تصویر کالا با موفقیت بروزرسانی شد',
        product_image_not_updated: 'بروزرسانی تصویر کالا با مشکل مواجه شد',
        brand_image_deleted: 'تصویر برند حذف شد',
        brand_image_not_deleted: 'حذف تصویر برند با مشکل مواجه شد',
        brand_image_updated: 'تصویر برند با موفقیت بروزرسانی شد',
        brand_image_not_updated: 'بروزرسانی تصویر برند با مشکل مواجه شد',
    },
    error: {
        user: {
            'Not Found': 'موردی پیدا نشد',
            'Forbidden': 'شما دسترسی های لازم را ندارید',
        },
        unique: {
            email: 'ایمیل تکراری می باشد',
            username: 'نام کاربری تکراری می باشد',
            mobile: 'موبایل تکراری می باشد',
        },
        duplicate_product_offer: 'این مورد قبلا اضافه شده است'
    }
};

export default customFarsiMessages;

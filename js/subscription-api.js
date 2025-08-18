// 邮箱订阅API模拟
// 用于处理用户邮箱订阅请求

/**
 * 订阅请求接口
 * @typedef {Object} SubscriptionRequest
 * @property {string} name - 用户姓名
 * @property {string} email - 邮箱地址
 * @property {string[]} interests - 感兴趣的内容类型
 */

/**
 * 订阅响应接口
 * @typedef {Object} SubscriptionResponse
 * @property {number} code - 响应状态码
 * @property {string} message - 响应消息
 * @property {Object} data - 响应数据
 */

// 模拟订阅数据存储
const subscriptions = new Map();

/**
 * 处理邮箱订阅
 * @param {SubscriptionRequest} request - 订阅请求
 * @returns {Promise<SubscriptionResponse>} 订阅响应
 */
async function handleSubscription(request) {
    try {
        const { name, email, interests } = request;
        
        // 验证必需参数
        if (!name || !email || !interests || interests.length === 0) {
            return {
                code: 400,
                message: '请填写完整的订阅信息',
                data: null
            };
        }

        // 验证邮箱格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                code: 400,
                message: '邮箱格式不正确',
                data: null
            };
        }

        // 检查是否已订阅
        if (subscriptions.has(email)) {
            return {
                code: 409,
                message: '该邮箱已订阅，感谢您的关注！',
                data: {
                    email: email,
                    subscribed_at: subscriptions.get(email).subscribed_at
                }
            };
        }

        // 创建订阅记录
        const subscription = {
            name: name,
            email: email,
            interests: interests,
            subscribed_at: new Date().toISOString(),
            status: 'active'
        };

        // 存储订阅信息
        subscriptions.set(email, subscription);

        // 模拟发送欢迎邮件
        console.log(`发送欢迎邮件到: ${email}`);

        return {
            code: 200,
            message: '订阅成功！',
            data: {
                email: email,
                subscribed_at: subscription.subscribed_at,
                interests: interests
            }
        };

    } catch (error) {
        console.error('订阅处理失败:', error);
        return {
            code: 500,
            message: '服务器内部错误',
            data: null
        };
    }
}

/**
 * 取消订阅
 * @param {string} email - 邮箱地址
 * @returns {Promise<SubscriptionResponse>} 响应结果
 */
async function cancelSubscription(email) {
    try {
        if (!subscriptions.has(email)) {
            return {
                code: 404,
                message: '未找到该邮箱的订阅记录',
                data: null
            };
        }

        const subscription = subscriptions.get(email);
        subscription.status = 'cancelled';
        subscription.cancelled_at = new Date().toISOString();

        return {
            code: 200,
            message: '取消订阅成功',
            data: {
                email: email,
                cancelled_at: subscription.cancelled_at
            }
        };

    } catch (error) {
        console.error('取消订阅失败:', error);
        return {
            code: 500,
            message: '服务器内部错误',
            data: null
        };
    }
}

/**
 * 获取订阅统计
 * @returns {Object} 订阅统计信息
 */
function getSubscriptionStats() {
    const total = subscriptions.size;
    const active = Array.from(subscriptions.values()).filter(sub => sub.status === 'active').length;
    const cancelled = total - active;

    return {
        total: total,
        active: active,
        cancelled: cancelled
    };
}

// 导出API函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleSubscription,
        cancelSubscription,
        getSubscriptionStats
    };
}

// 浏览器环境下的全局函数
if (typeof window !== 'undefined') {
    window.SubscriptionAPI = {
        handleSubscription,
        cancelSubscription,
        getSubscriptionStats
    };
} 
/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2023-02-21
 * Time: 16:07
 * About:
 *
 */

module.exports = {
    apps : [{
        name: "base64converter",
        cwd:"/mnt/web/www/base64converter_com/www",
        script: "npm",
        args: 'start',
        exp_backoff_restart_delay: 100,
        watch: false,
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        },
        error_file: '/mnt/web/www/base64converter_com/logs/err.log',
        out_file: '/mnt/web/www/base64converter_com/logs/out.log',
        time: true,
    }]
}

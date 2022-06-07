const version = require('./package.json').version;
const exec = require('child_process').exec;
function myExec(script = '') {
    return new Promise(function(resolve, reject) {
        exec(script, (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        })
    });
}
myExec('npm publish')
    .then(res => {
        console.log(`npm publish success: 已发布版本v${version}`, res)
        return myExec('git add .');
    })
    .then(res => {
        return myExec(`git commit -m 'feat: v${version}'`);
    })
    .then(res => {
        console.log('commit success: ', res);
        return myExec(`git tag v${version}`);
    })
    .then(res => {
        console.log('new tag: ', res);
        return myExec(`git push && git push origin v${version}`)
    })
    .then(res => {
        console.log('push success: 代码已提交到远程仓库\n', res);
    })
    .catch(e => {
        console.log(e);
    })
// exec('git', ['add', '.']);
// exec('git', ['commit', '-m', `feat: v${version}`]);
// console.log(`commit success: feat: v${version}`);
// exec('git', ['tag', `v${version}`]);
// console.log(`new tag: v${version}`);
// exec('git', ['push']);
// exec('git', ['push', 'origin', `v${version}`]);
// console.log('代码已提交到远程');
// const res = exec('gitsdfa');
// console.log(res);

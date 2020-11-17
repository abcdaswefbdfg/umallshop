// 引入重新封装的实例
import axios from './axios'

// 暴露接口

//封装添加菜单接口
export function getMenuAdd(data) {
    return axios.post('/api/menuadd', data)
}
//封装删除菜单接口
export function getMenuDelete(data) {
    return axios.post('/api/menudelete', data)
}
//封装菜单列表接口
export function getMenuList(params) {
    return axios.get('/api/menulist', { params })
}
// 封装修改菜单接口
export function getMenuEdit(data) {
    return axios.post('/api/menuedit', data)
}
//封装菜单获取一条接口
export function getMenuInfo(params) {
    return axios.get('/api/menuinfo', { params })
}




//封装添加角色接口
export function getRoleAdd(data) {
    return axios.post('/api/roleadd', data)
}
//封装删除角色接口
export function getRoleDelete(data) {
    return axios.post('/api/roledelete', data)
}
//封装角色列表接口
export function getRoleList() {
    return axios.get('/api/rolelist')
}
// 封装修改角色接口
export function getRoleEdit(data) {
    return axios.post('/api/roleedit', data)
}
//封装角色获取一条接口
export function getRoleInfo(params) {
    return axios.get('/api/roleinfo', { params })
}




//封装添加user接口
export function getUserAdd(data) {
    return axios.post('/api/useradd', data)
}
//封装删除user接口
export function getUserDelete(data) {
    return axios.post('/api/userdelete', data)
}
//封装user列表接口
export function getUserList(params) {
    return axios.get('/api/userlist', { params })
}
// 封装修改user接口
export function getUserEdit(data) {
    return axios.post('/api/useredit', data)
}
//封装user获取一条接口
export function getUserInfo(params) {
    return axios.get('/api/userinfo', { params })
}

//管理员总数（用于计算分页）
export function getUserCount() {
    return axios.get('/api/usercount')
}

//管理员登录接口
export function getUserLogin(data) {
    return axios.post('/api/userlogin', data)
}



//封装添加cate接口
export function getCateAdd(data) {
    return axios.post('/api/cateadd', data)
}
//封装删除cate接口
export function getCateDelete(data) {
    return axios.post('/api/catedelete', data)
}

//封装cate列表接口
export function getCateList(params) {
    return axios.get('/api/catelist', { params })
}
// 封装修改cate接口
export function getCateEdit(data) {
    return axios.post('/api/cateedit', data)
}
//封装cate获取一条接口
export function getCateInfo(params) {
    return axios.get('/api/cateinfo', { params })
}



//封装添加商品规格接口
export function getSpecsAdd(data) {
    return axios.post('/api/specsadd', data)
}
//封装删除商品规格接口
export function getSpecsDelete(data) {
    return axios.post('/api/specsdelete', data)
}
//封装商品规格列表接口
export function getSpecsList(params) {
    return axios.get('/api/specslist', { params })
}
// 封装修改商品规格接口
export function getSpecsEdit(data) {
    return axios.post('/api/specsedit', data)
}
//封装商品规格获取一条接口
export function getSpecsInfo(params) {
    return axios.get('/api/specsinfo', { params })
}

//商品规格总数（用于计算分页）
export function getSpecsCount() {
    return axios.get('/api/specscount')
}




//封装member列表接口
export function getMemberList(params) {
    return axios.get('/api/memberlist', { params })
}
// 封装修改member接口
export function getMemberEdit(data) {
    return axios.post('/api/memberedit', data)
}
//封装member获取一条接口
export function getMemberInfo(params) {
    return axios.get('/api/memberinfo', { params })
}


//封装添加banner接口
export function getBannerAdd(data) {
    return axios.post('/api/banneradd', data)
}
//封装删除banner接口
export function getBannerDelete(data) {
    return axios.post('/api/bannerdelete', data)
}

//封装banner列表接口
export function getBannerList(params) {
    return axios.get('/api/bannerlist', { params })
}
// 封装修改banner接口
export function getBannerEdit(data) {
    return axios.post('/api/banneredit', data)
}
//封装banner获取一条接口
export function getBannerInfo(params) {
    return axios.get('/api/bannerinfo', { params })
}



//封装添加seck接口
export function getSeckAdd(data) {
    return axios.post('/api/seckadd', data)
}
//封装删除seck接口
export function getSeckDelete(data) {
    return axios.post('/api/seckdelete', data)
}
//封装seck列表接口
export function getSeckList(params) {
    return axios.get('/api/secklist', { params })
}
// 封装修改seck接口
export function getSeckEdit(data) {
    return axios.post('/api/seckedit', data)
}
//封装seck获取一条接口
export function getSeckInfo(params) {
    return axios.get('/api/seckinfo', { params })
}


//封装添加商品接口
export function getGoodsAdd(data) {
    return axios.post('/api/goodsadd', data)
}
//封装删除商品接口
export function getGoodsDelete(data) {
    return axios.post('/api/goodsdelete', data)
}
//封装商品列表接口
export function getGoodsList(params) {
    return axios.get('/api/goodslist', { params })
}
// 封装修改商品接口
export function getGoodsEdit(data) {
    return axios.post('/api/goodsedit', data)
}
//封装商品获取一条接口
export function getGoodsInfo(params) {
    return axios.get('/api/goodsinfo', { params })
}
//商品总数（用于计算分页）
export function getGoodsCount() {
    return axios.get('/api/goodscount')
}
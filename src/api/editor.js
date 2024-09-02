import commonApi from './_common.js'

export default {
    getScnList(scb, fcb) {
        let reqUrl = '/editor'

        commonApi.GET(reqUrl, (data) => {
            if (scb) {
                let {node_list} = data
                scb(node_list)
            }
        }, (err) => {
            if (fcb) {
                fcb(err)
            }
        })
    },
    getScnDetail(param, scb, fcb) {
        let reqUrl = '/editor/' + param.seqno + '/' + param.type

        commonApi.GET(reqUrl, (data) => {
            if(scb) {
                let { node_detail } = data
                scb(node_detail)
            }
        }, (err) => {
            if (fcb) {
                fcb(err)
            }
        })
    },
    updateScnDetail(param, scb, fcb) {
        let reqUrl = '/editor/' + param.node_detail.seqno + '/' + param.node_detail.type

        commonApi.PUT(reqUrl, param, (data) => {
            if (scb) {
                scb(data)
            }
        }, (err) => {
            if(fcb) {
                fcb(err)
            }
        })
    }
}
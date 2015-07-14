($(function () {

    var ft = new FeatureViewer("FDSJKLFJDSFKLJDFHADJKLFHDSJKLFHDAFJKLDHFJKLDASFHDJKLFHDSAJKLFHDAKLFJDHSAFKLDLSNCDJ"+
    	"KLFENFIUPERWDJKPCNVDFPIEHFDCFJDKOWFPDJWFKLXSJFDW9FIPUAENDCXAMSFNDUAFIDJFDLKSAFJDSAKFLJDSADJFDW9FIPUAENDCXAMSFNDAAAAAAAAAAAFJDSAKFL",".chart", {
    	showAxis: true,
    	showSequence: true,
    	brushActive: true,
    	verticalLine:true
    });
    ft.addFeature({
        data: [{x:20,y:32},{x:46,y:100},{x:123,y:167}],
        name: "test feature 0",
        className: "test0",
        color: "#0F8292",
        type: "rect"
    });
    ft.addFeature({
        data: [{x:32,y:47},{x:58,y:72}],
        name: "test feature 1",
        className: "test1",
        color: "#066B78",
        type: "rect"
    });
    ft.addFeature({
        data: [{x:52,y:52},{x:92,y:92}],
        name: "test feature 2",
        className: "test2",
        color: "#007800",
        type: "unique"
    });
    ft.addFeature({
        data: [{x:130,y:184},{x:40,y:142},{x:80,y:110}],
        name: "test feature 3",
        className: "test3",
        color: "#780C43",
        type: "path"
    });
    ft.addFeature({
        data: [{x:120,y:154},{x:22,y:163},{x:90,y:108},{x:10,y:25},{x:193,y:210},{x:78,y:85},{x:96,y:143},{x:14,y:65},{x:56,y:167}],
        name: "test feature 4",
        className: "test4",
        color: "#C50063",
        type: "multipleRect"
    });
    ft.addFeature({
        data: [{x:5,y:12},{x:41,y:87},{x:133,y:172}],
        name: "test feature 5",
        className: "test5",
        color: "#CFB915",
        type: "rect"
    })

}));
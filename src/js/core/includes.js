import $ from 'jquery';
import { call } from 'file-loader';

const loadHtmlSuccessCallBacks = [];

export function onLoadHtmlSuccess(callBack) {

    if(!loadHtmlSuccessCallBacks.includes(callBack)){
        loadHtmlSuccessCallBacks.push(callBack);
    }
}

function loadIncludes(parent){


    if(parent){
        parent = 'body';
    }
    $(parent).find('[wm-include]').each(function(i, e) {
        
        const url = $(e).attr('wm-include')
        $.ajax({
            url,
            success(data){
                
                $(e).html(data);
                $(e).removeAttr('wm-include');
                
                loadHtmlSuccessCallBacks.forEach(callBack => callBack(data));
                loadIncludes(e);
            }
        });
    })
    
}

loadIncludes();
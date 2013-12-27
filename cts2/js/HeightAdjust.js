/**
 * Created with IntelliJ IDEA.
 * User: Scott Bauer, bauer.scott@mayo.edu
 * Date: 12/23/13
 * Time: 3:04 PM
 */
$(function(){
boxes = $('.well');
maxHeight = Math.max.apply(
    Math, boxes.map(function() {
        return $(this).height();
    }).get());
boxes.height(maxHeight);
});
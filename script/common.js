/**
 * Created by ashulpekov on 11.04.2016.
 */

'use strict';

(function($){
    //initialization when document is ready
    $('document').ready(function(){
        var myActionBox = $('#myActionBox');
        var defaultDataForBox = {
            width: 200,
            height: 200,
            numOfRows: 10,
            numOfCells: 10,
            speed: 30
        };

        //apply form data to box
        formHandler(myActionBox,defaultDataForBox);
        //rendering box
        renderMyActionBox(myActionBox, defaultDataForBox);
        //drawing animation
        clickSelectedCellActionBox(myActionBox, defaultDataForBox);
    });



    var clickSelectedCellActionBox = function(myActionBox, defaultDataForBox){
        $('tr').on('click', function(){
            var randColor = randomColor();
            var patentRowFirstChild = $(this).children()[0];
            var countChildren = fillingTails(patentRowFirstChild, randColor);
            var tempRow = $(patentRowFirstChild);
            var i = 0;
            var stepCount = parseInt(defaultDataForBox.numOfCells)+parseInt(defaultDataForBox.numOfRows);


            var tempInterval = setInterval(function(){
                myActionBox.addClass('avoid-clicks');
                if (tempRow.next()[0]){
                    tempRow = tempRow.next();
                }
                countChildren++;
                fillingTails(tempRow,randColor);
                renderParentsRow(tempRow, countChildren, randColor, defaultDataForBox);
                i++;
                if(stepCount<i){
                    clearInterval(tempInterval);
                    myActionBox.removeClass('avoid-clicks');
                }
            }, defaultDataForBox.speed);
        })
    };

    var randomColor = function(){
        var grille = '#';
        var chars = '0123456789ABCDEF'.split('');
        var color = '';
            for (var i = 0; i < 6; i++ ) {
                color += chars[Math.round(Math.random() * 10)];
            }
        color = grille+color;
            return color;
    };

    var formHandler = function(myActionBox, defaultDataForBox){
        $("form").on('submit', function (e) {
            var formDataTemp = $(this).serializeArray();
            e.preventDefault();

            defaultDataForBox.width = formDataTemp[0].value;
            defaultDataForBox.height = formDataTemp[0].value;
            defaultDataForBox.numOfRows = formDataTemp[1].value;
            defaultDataForBox.numOfCells = formDataTemp[2].value;
            defaultDataForBox.speed = formDataTemp[3].value;
            $('#myActionBox').empty();
            renderMyActionBox(myActionBox, defaultDataForBox);
            clickSelectedCellActionBox(myActionBox, defaultDataForBox);

        })
    };

    var renderParentsRow = function(currElement , countChildren, randColor, defaultDataForBox){
        var prevParent = currElement.parent().prev();
        var nextParent = currElement.parent().next();
        var i = 0;
        while (i<defaultDataForBox.numOfCells){
            var index1 = 0;
            var index2 = 0;
            prevParent.children().each(function(index, elem) {
                index1 = index;
                if(index<countChildren-1){
                    $(elem).css('background', randColor);
                }
            });
            nextParent.children().each(function(index, elem) {
                index2 = index;
                if(index<countChildren-1){
                    $(elem).css('background', randColor);
                }
            });

            i++;
            countChildren--;
            prevParent = prevParent.prev();
            nextParent = nextParent.next();

        }

    };

    var fillingTails = function(currElement, randColor){
        var prevElement = $(currElement).prev();
        var i = 1;
        var counter = 1;

        if($(currElement).is(':first-child')){
            $(currElement).css('background', randColor);
        return counter;
        }else{
            $(currElement).css('background', randColor);

            while( i > 0 ){
                counter++;
                if($(prevElement).is(':first-child')){
                    i = 0;
                }
                $(prevElement).css('background', randColor);
                prevElement = $(prevElement).prev();
                if (counter>40){
                    i = 0;
                }
            }
        return counter;
        }
    };

    var renderMyActionBox = function(myActionBox, defaultDataForBox){
        var rows = '<tr></tr>';
        var cells = '<td></td>';
        var cellsStr = '';
        var numOfRows = defaultDataForBox.numOfRows;
        var numOfCells = defaultDataForBox.numOfCells;

        myActionBox.append('<table></table>');

        var actionTable = $('table');

        while(numOfRows){
            actionTable.append(rows);
            numOfRows--;
        }

        while(numOfCells){
            cellsStr += cells;
            numOfCells--;
        }

        $('tr').each(function(){
            $(this).append(cellsStr);
        });

        actionTable.css('height', defaultDataForBox.height);
        actionTable.css('width', defaultDataForBox.width);
        myActionBox.css('height', defaultDataForBox.height);
        myActionBox.css('width', defaultDataForBox.width);
    };


})(jQuery);
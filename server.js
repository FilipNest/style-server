/*jslint node: true, nomen:true */
"use strict";

var http = require('http');
var fs = require('fs');
var addstyle;

http.createServer(function (req, res) {
    if (req.url === "/favicon.ico") {
        res.end("404");
    } else {

        var params = req.url.replace("/", "").split("-"),
            current = 0,
            styles = "";

        addstyle = function (stylenumber) {

            if (stylenumber < params.length) {

                fs.readFile(__dirname + "/" + params[current] + ".css", "utf-8", function (err, data) {

                    if (err) {

                        current += 1;
                        addstyle(current);

                    } else {

                        current += 1;
                        styles += "\n" + data;
                        addstyle(current);

                    }
                });

            } else {

                res.end(styles);

            }
        };
        
        addstyle(current);

    }

}).listen(5555, '0.0.0.0');
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


fs   = require 'fs'
sysPath = require 'path'

# See docs at http://brunch.readthedocs.org/en/latest/config.html.

endsWith = (string, arr) ->
  result = false
  arr.forEach (substring) ->
    result = string.lastIndexOf(substring) > 0 or result
    null
  result

exports.config =

  paths:

    'public': 'public'
    watched: ['js', 'vendor', 'css', 'assets']

  modules:
    nameCleaner: (path) ->
      path.replace(/^js\//, '')

  files:

    javascripts:
      joinTo:
        'app.js': /^js/
        'vendor.js': /^vendor/
      order:
        before: [
          'vendor/jquery-1.10.1.min.js',
          'vendor/parse-1.2.18.min.js'
        ]

    stylesheets:
      joinTo: 'app.css'

  sourceMaps: false

  conventions:
    ignored: (path) ->
      endsWith sysPath.basename(path), ['.debug.js']
#    assets: /assets[\\/]/

#  optimize: true

  server:
    port: 3333
    base: ''
    run: no



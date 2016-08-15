﻿/// <reference path="..\harness.ts" />
/// <reference path="..\..\compiler\commandLineParser.ts" />

namespace ts {
    describe("initTSConfig", () => {
        function initTSConfigCorrectly(name: string, commandLinesArgs: string[]) {
            describe(name, () => {
                const commandLine = parseCommandLine(commandLinesArgs);
                const initResult = generateTSConfig(commandLine.options, commandLine.fileNames);
                const outputFileName = `tsConfig/${name.replace(/[^a-z0-9\-. ]/ig, "")}/tsconfig.json`;

                it(`Correct output for ${outputFileName}`, () => {
                    Harness.Baseline.runBaseline("Correct output", outputFileName, () => {
                        if (initResult) {
                            return JSON.stringify(initResult, undefined, 4);
                        }
                        else {
                            // This can happen if compiler recieve invalid compiler-options
                            /* tslint:disable:no-null-keyword */
                            return null;
                            /* tslint:enable:no-null-keyword */
                        }
                    });
                });
            });
        }

        initTSConfigCorrectly("Default initialized TSConfig", ["--init"]);

        initTSConfigCorrectly("Initialized TSConfig with files options", ["--init", "file0.st", "file1.ts", "file2.ts"]);

        initTSConfigCorrectly("Initialized TSConfig with boolean value compiler options", ["--init", "--noUnusedLocals"]);

        initTSConfigCorrectly("Initialized TSConfig with enum value compiler options", ["--init", "--target", "es5", "--jsx", "react"]);

        initTSConfigCorrectly("Initialized TSConfig with list compiler options", ["--init", "--types", "jquery,mocha"]);

        initTSConfigCorrectly("Initialized TSConfig with list compiler options with enum value", ["--init", "--lib", "es5,es2015.core"]);
    });
}
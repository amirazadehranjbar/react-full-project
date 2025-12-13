import React from "react";
import {Tabs, Tab, Card, CardBody} from "@heroui/react";
import {Keyboard, Monitor, Mouse, SpeakerIcon,} from "lucide-react";


export default function TabsComp() {


    return (
        <div className="flex flex-col h-full">
            <div className="flex w-full flex-col">
                <Tabs aria-label="Options" placement="start"
                      className="bg-sky-900/20 rounded-br-md border-r border-b border-gray-300 shadow shadow-gray-800">


                    <Tab key="monitor" name="monitor" title={
                        <div className="flex items-center border-b">
                            <Monitor/>
                            <span>monitor</span>
                        </div>
                    }>
                        <Card>
                            <CardBody>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </CardBody>
                        </Card>
                    </Tab>


                    <Tab key="speaker" title={
                        <div className="flex items-center space-x-2">
                            <SpeakerIcon/>
                            <span>speaker</span>
                        </div>
                    }>
                        <Card>
                            <CardBody>
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                                esse cillum dolore eu fugiat nulla pariatur.
                            </CardBody>
                        </Card>
                    </Tab>


                    <Tab key="mouse" title={
                        <div className="flex items-center space-x-2">
                            <Mouse className="mr-4"/>
                            <span className="mr-1">mouse</span>
                        </div>
                    }>
                        <Card>
                            <CardBody>
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum.
                            </CardBody>
                        </Card>
                    </Tab>


                    <Tab key="keyboard" title={
                        <div className="flex items-center space-x-2">
                            <Keyboard/>
                            <span className="mr-1">keyboard</span>
                        </div>
                    }>
                        <Card>
                            <CardBody>
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                mollit anim id est laborum.
                            </CardBody>
                        </Card>
                    </Tab>


                </Tabs>
            </div>
        </div>
    );
}


package com.kotlinspringvue.backend.model

import com.fasterxml.jackson.annotation.JsonProperty
import java.io.Serializable

class NewPerfomance : Serializable {

    @JsonProperty("name")
    var name: String? = null

    @JsonProperty("date")
    var date: String? = null

    @JsonProperty("phoneNumber")
    var phoneNumber: String? = null

    @JsonProperty("managerFullName")
    var managerFullName: String? = null

    @JsonProperty("Evaluation")
    var evaluation: Integer? = null

    constructor() {}

    constructor(name: String?, date: String?, phoneNumber: String?, managerFullName: String?, evaluation:Integer?) {
        this.name = name
        this.date = date
        this.phoneNumber = phoneNumber
        this.managerFullName = managerFullName
        this.evaluation = evaluation
    }

}
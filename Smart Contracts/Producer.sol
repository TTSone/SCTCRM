pragma solidity ^0.4.26;

contract Producer {
    bool public status;
    mapping (address => ApplyInfo) public applyinfos;
    mapping (address => uint) public applyId;
    address[] public applyAccts;
    uint public numofApplys;
    address public owner;
    proInfo producer;
    
    event IdentityApplied(string pubname, string pubpk, string pubemail, address pubaddr);
    event ApplicantRemoved(address pubaddr);
    event StatusChanged(bool Status);
    
    struct proInfo {
        uint timestamp;
        string namePrefix;
        string producerName;
        string producerNDNPk;
        address producerAddress;
        address authAddress;
        string identityExp;
    }
    struct ApplyInfo{
        string publisherName;
        string publisherNDNPk;
        string email;
        address publisherAddress;
    }
    constructor()public{
        owner = msg.sender;
        status = true;
        numofApplys=0;
        producer.timestamp=now;
        producer.producerName="Producer";
        producer.namePrefix="/IMU/CS/Software";
        producer.producerAddress=0x26E163065F15F403b961431116B00483C4e70c4E;
        producer.producerNDNPk="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDPtNsKccqCTMDcsUF3v6PIeh5HMRS16gRAg8zfLy4ApPxEF9TY1BI+QR9bLmeYvUOvuct054Q38tSjSrkbv0mXoTJ/sPwc0z0U3Po0kRUQdqQ67Qd/gSLjxJtdF13HuxrnQgVdU84CrBWuDhV3s/vlbVflERRx3Mgbx2LMcTsl9QIDAQAB";
        producer.authAddress=owner;
        producer.identityExp="2 years";
    }
    
    function applyNewPublisher(string _pubname, string _pubpk, string _pubemail, address _pubaddr) public {
       ApplyInfo memory newPub = ApplyInfo(_pubname, _pubpk, _pubemail, _pubaddr);
        applyAccts.push(_pubaddr);
        applyinfos[_pubaddr] = newPub;
        applyAccts.push(_pubaddr);
        numofApplys++;
        emit IdentityApplied(_pubname,_pubpk,_pubemail,_pubaddr);
    }
    
    function removeApplicant(address _addr) onlyOwner public {
       uint j=0;
        for (uint i = 0; i<applyAccts.length-1; i++){
            if(applyAccts[i]==_addr)
            j=i;
        }
        if(j!=0){
        delete applyAccts[j];
        applyAccts.length--;
        numofApplys--;
        emit ApplicantRemoved(_addr);
        }
    }

    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
    function revokeIdentity() onlyOwner public{
        status=false;
        emit StatusChanged(status);
    }

    
    function getProducerInfo() public view returns (string, string, string, address, uint, address, string, bool) {
        if(status==true)
        return (producer.namePrefix, producer.producerName, producer.producerNDNPk, producer.producerAddress, producer.timestamp, producer.authAddress, producer.identityExp, status);
    }
    
    function getProducerName() public view returns (string) {
        if(status==true)
        return (strConcat(producer.namePrefix,producer.producerName));
    }
    
    function getProducerNDNPk() public view returns (string) {
      if(status==true) 
       return (producer.producerNDNPk);
    }
    
    function getProducerAddr() public view returns (address) {
       if(status==true)
        return (producer.producerAddress);
    }
    
    function getProStatus() public view returns (bool) {
       return status;
    }
    
    function strConcat(string _a, string _b) pure internal returns (string) {
        return strConcat(_a, _b);
    }

}
